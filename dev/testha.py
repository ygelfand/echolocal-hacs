import argparse
import json
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import yaml
from websockets.sync.client import connect

CLIENT = "http://localhost/"
USER = {"name": "Dev", "username": "dev", "password": "dev", "language": "en"}
KEYS = {"lanovo": "/data/misc/lanovo/psk", "echolocal": "/data/misc/echolocal/psk"}


def call(base, path, body=None, token=None, form=False):
    data = None
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if body is not None and form:
        data = urllib.parse.urlencode(body).encode()
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    elif body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(base + path, data=data, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        text = resp.read().decode()
        return json.loads(text) if text else None


def wait(base):
    for _ in range(180):
        try:
            call(base, "/api/onboarding")
            return
        except urllib.error.HTTPError:
            return
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            time.sleep(1)
    sys.exit(f"{base} never answered")


def onboarded(base):
    try:
        steps = call(base, "/api/onboarding")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return True
        raise
    return any(s["step"] == "user" and s["done"] for s in steps)


def tokens(base, store):
    saved = store / "refresh_token"
    if not onboarded(base):
        code = call(base, "/api/onboarding/users", {"client_id": CLIENT, **USER})["auth_code"]
        got = call(
            base,
            "/auth/token",
            {"grant_type": "authorization_code", "code": code, "client_id": CLIENT},
            form=True,
        )
        saved.write_text(got["refresh_token"])
        access = got["access_token"]
        for step in ("core_config", "analytics"):
            call(base, f"/api/onboarding/{step}", {}, token=access)
        call(
            base,
            "/api/onboarding/integration",
            {"client_id": CLIENT, "redirect_uri": CLIENT},
            token=access,
        )
        return access
    got = call(
        base,
        "/auth/token",
        {"grant_type": "refresh_token", "refresh_token": saved.read_text(), "client_id": CLIENT},
        form=True,
    )
    return got["access_token"]


def flow(base, token, handler, answers):
    step = call(base, "/api/config/config_entries/flow", {"handler": handler}, token=token)
    while step.get("type") == "form":
        fields = {f["name"] for f in step.get("data_schema", [])}
        reply = {k: v for k, v in answers.items() if k in fields}
        if not reply and fields:
            sys.exit(f"{handler} asked for {sorted(fields)} at step {step.get('step_id')}")
        step = call(base, f"/api/config/config_entries/flow/{step['flow_id']}", reply, token=token)
    if step.get("type") not in ("create_entry", "abort"):
        sys.exit(f"{handler}: {step}")
    return step


def key(device):
    if device.get("key"):
        return device["key"]
    path = KEYS.get(device.get("product", ""))
    if not path:
        return None
    serial = device.get("adb") or f"{device['host']}:5555"
    if serial not in attached():
        subprocess.run(["adb", "connect", serial], capture_output=True, timeout=5)
        if serial not in attached():
            raise LookupError(f"{serial} is not attached")
    for cmd in (["cat", path], ["su", "-c", f"cat {path}"]):
        out = subprocess.run(
            ["adb", "-s", serial, "shell", *cmd], capture_output=True, text=True, timeout=5
        )
        if out.returncode == 0 and out.stdout.strip():
            return out.stdout.strip()
    raise LookupError(f"no key at {path} via {serial}")


def quiet(base, token):
    url = base.replace("http", "ws", 1) + "/api/websocket"
    with connect(url, max_size=None) as ws:
        ws.recv()
        ws.send(json.dumps({"type": "auth", "access_token": token}))
        ws.recv()
        ws.send(json.dumps({"id": 1, "type": "config/entity_registry/list"}))
        entries = json.loads(ws.recv())["result"]
        wanted = [
            e["entity_id"]
            for e in entries
            if e["entity_id"].startswith("assist_satellite.") and not e.get("disabled_by")
        ]
        for n, entity_id in enumerate(wanted, start=2):
            ws.send(
                json.dumps(
                    {
                        "id": n,
                        "type": "config/entity_registry/update",
                        "entity_id": entity_id,
                        "disabled_by": "user",
                    }
                )
            )
            ws.recv()
            print(f"{entity_id}: disabled")


def reachable(host, port):
    try:
        socket.create_connection((host, port), timeout=2).close()
    except OSError:
        return False
    return True


def attached():
    out = subprocess.run(["adb", "devices"], capture_output=True, text=True, timeout=15).stdout
    return {f[0] for f in (line.split() for line in out.splitlines()[1:]) if f[1:] == ["device"]}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("base")
    parser.add_argument("--store", default="dev/ha")
    parser.add_argument("--devices", default="dev/devices.yaml")
    args = parser.parse_args()

    store = Path(args.store)
    wait(args.base)
    token = tokens(args.base, store)
    (store / "token").write_text(token)

    have = {e["domain"] for e in call(args.base, "/api/config/config_entries/entry", token=token)}
    if "echolocal" not in have:
        print("echolocal:", flow(args.base, token, "echolocal", {"sidebar": True}).get("type"))

    listed = Path(args.devices)
    config = yaml.safe_load(listed.read_text()) if listed.exists() else None
    for device in (config or {}).get("devices", []):
        name = device.get("name", device["host"])
        answers = {"host": device["host"], "port": device.get("port", 6053)}
        if not reachable(answers["host"], answers["port"]):
            print(f"{name}: skipped, {answers['host']}:{answers['port']} does not answer")
            continue
        try:
            if psk := key(device):
                answers["noise_psk"] = psk
        except (LookupError, subprocess.TimeoutExpired) as err:
            print(f"{name}: skipped, {err}")
            continue
        result = flow(args.base, token, "esphome", answers)
        print(f"{name}:", result.get("reason", "added"))

    time.sleep(5)
    quiet(args.base, token)

    print(f"HASS_SERVER={args.base} HASS_TOKEN=$(cat {store}/token)")


if __name__ == "__main__":
    main()
