COMPONENT := custom_components/echolocal
BUNDLE := $(COMPONENT)/frontend/echolocal.js
BRAND := $(COMPONENT)/brand
VERSION := $(shell python3 -c "import json; print(json.load(open('$(COMPONENT)/manifest.json'))['version'])")

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

.PHONY: version
version: ## Print the manifest version
	@echo $(VERSION)

.PHONY: deps
deps: ## Install the frontend build dependencies
	npm ci

node_modules: package-lock.json
	npm ci
	@touch node_modules

.PHONY: build
build: node_modules ## Bundle the frontend into the component
	npm run build

.PHONY: watch
watch: node_modules ## Rebuild on every change; reload the browser to pick it up
	npm run watch

.PHONY: typecheck
typecheck: node_modules ## Typecheck the frontend
	npm run typecheck

.PHONY: lint
lint: node_modules ## Lint the Python and typecheck the frontend
	ruff check $(COMPONENT) tests
	ruff format --check $(COMPONENT) tests
	npm run typecheck

.PHONY: fmt
fmt: ## Format the Python
	ruff format $(COMPONENT) tests

TEST_PY := dev/.test-venv/bin/python

$(TEST_PY): requirements_test.txt
	python3.14 -m venv dev/.test-venv
	dev/.test-venv/bin/pip install -q -r requirements_test.txt
	@touch $(TEST_PY)

.PHONY: test
test: $(TEST_PY) ## Run the Python tests against Home Assistant's test harness
	$(TEST_PY) -m pytest -q

.PHONY: zip
zip: build ## Build echolocal.zip, what HACS installs (VERSION=x.y.z stamps the manifest)
	@/bin/rm -rf dist echolocal.zip
	@mkdir -p dist
	@/bin/cp -R $(COMPONENT) dist/echolocal
	@find dist -name __pycache__ -prune -exec /bin/rm -rf {} +
	@python3 -c "import json, sys; p = 'dist/echolocal/manifest.json'; m = json.load(open(p)); \
		m['version'] = sys.argv[1]; open(p, 'w').write(json.dumps(m, indent=2) + '\n')" "$(VERSION)"
	@cd dist/echolocal && zip -qr ../../echolocal.zip .
	@echo "echolocal.zip $(VERSION)"

.PHONY: check
check: lint build ## Validate the manifests, lint, and build the bundle
	@python3 -m json.tool $(COMPONENT)/manifest.json >/dev/null && echo "manifest.json ok"
	@python3 -m json.tool hacs.json >/dev/null && echo "hacs.json ok"
	@python3 -m compileall -q $(COMPONENT) && echo "compile ok"

.PHONY: brand
brand: ## Regenerate the brand icons Home Assistant serves from the integration (needs rsvg-convert)
	@for n in icon dark_icon; do \
		node brand.mjs $$n | rsvg-convert -w 256 -h 256 -o $(BRAND)/$$n.png; \
		node brand.mjs $$n | rsvg-convert -w 512 -h 512 -o $(BRAND)/$$n@2x.png; \
		echo "$(BRAND)/$$n.png $(BRAND)/$$n@2x.png"; \
	done

.PHONY: preview
preview: build ## Serve the card and dashboard preview against a fixture, no Home Assistant needed
	@echo "http://localhost:8777/dev/preview.html"
	python3 -m http.server 8777

HA_IMAGE ?= ghcr.io/home-assistant/home-assistant:stable
HA_NAME := echolocal-ha
HA_PORT ?= 8124

DEV_PY := dev/.venv/bin/python

$(DEV_PY):
	python3 -m venv dev/.venv
	dev/.venv/bin/pip install -q pyyaml websockets

.PHONY: ha-up
ha-up: build $(DEV_PY) ## Run a throwaway Home Assistant with this integration and the devices in dev/devices.yaml
	@mkdir -p dev/ha
	@docker rm -f $(HA_NAME) >/dev/null 2>&1 || true
	docker run -d --name $(HA_NAME) -p $(HA_PORT):8123 \
		-v $(CURDIR)/dev/ha:/config \
		-v $(CURDIR)/$(COMPONENT):/config/custom_components/echolocal:ro \
		$(HA_IMAGE)
	$(DEV_PY) dev/testha.py http://localhost:$(HA_PORT)
	@echo "http://localhost:$(HA_PORT)  dev / dev"

.PHONY: ha-restart
ha-restart: build $(DEV_PY) ## Restart the throwaway Home Assistant to load integration changes
	docker restart $(HA_NAME)
	$(DEV_PY) dev/testha.py http://localhost:$(HA_PORT)

.PHONY: ha-logs
ha-logs: ## Follow the throwaway Home Assistant's log
	docker logs -f $(HA_NAME)

.PHONY: ha-down
ha-down: ## Stop and remove the throwaway Home Assistant, keeping dev/ha
	docker rm -f $(HA_NAME)

.PHONY: clean
clean: ## Remove build output and caches
	rm -rf node_modules $(COMPONENT)/__pycache__ $(BUNDLE).map

.PHONY: release
release: check ## Tag the manifest version, publish a GitHub release (gh), then start the next patch version
	@git diff --quiet HEAD || { echo "working tree dirty — commit first"; exit 1; }
	@git rev-parse "v$(VERSION)" >/dev/null 2>&1 && { echo "tag v$(VERSION) already exists"; exit 1; } || true
	git push
	gh release create "v$(VERSION)" --title "v$(VERSION)" --generate-notes
	@git rev-parse -q --verify "refs/tags/v$(VERSION)" >/dev/null || git fetch origin tag "v$(VERSION)"
	@echo "released v$(VERSION)"
	@next=$$(echo $(VERSION) | awk -F. -v OFS=. '{$$NF += 1; print}'); \
		python3 -c "import re, sys; p = sys.argv[1]; s = open(p).read(); open(p, 'w').write(re.sub(r'(\"version\": \")[^\"]*', r'\g<1>' + sys.argv[2], s))" $(COMPONENT)/manifest.json "$$next"; \
		git commit -q -m "Start $$next" $(COMPONENT)/manifest.json; \
		echo "version is now $$next (committed, not pushed)"
