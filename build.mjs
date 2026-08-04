// Bundles the frontend into what the integration serves. The output is committed, because HACS installs
// the repository as it is and never builds anything.

import * as esbuild from "esbuild";

const options = {
  entryPoints: ["src/echolocal.ts"],
  outfile: "custom_components/echolocal/frontend/echolocal.js",
  bundle: true,
  format: "esm",
  target: "es2022",
  loader: { ".css": "text" },
  legalComments: "inline",
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  // A source map is three times the size of the bundle, so only while working.
  const context = await esbuild.context({ ...options, sourcemap: true });
  await context.watch();
  console.log("watching src");
} else {
  await esbuild.build({ ...options, minify: true });
}
