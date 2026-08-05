// Bundles the frontend into what the integration serves. The output is committed, because HACS installs
// the repository as it is and never builds anything.

import { readFile } from "node:fs/promises";

import * as esbuild from "esbuild";

// A stylesheet is inlined as a string, and minify does not reach inside a string, so each one is put
// through the CSS minifier on the way in. Otherwise every comment and indent we write ships too.
const styles = {
  name: "styles",
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
      const source = await readFile(path, "utf8");
      const { code } = await esbuild.transform(source, { loader: "css", minify: true });
      return { contents: code, loader: "text" };
    });
  },
};

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
  // A source map is three times the size of the bundle, so only while working. Styles go in as they
  // are written, so what the browser shows matches the file being edited.
  const context = await esbuild.context({ ...options, sourcemap: true });
  await context.watch();
  console.log("watching src");
} else {
  await esbuild.build({ ...options, minify: true, plugins: [styles] });
}
