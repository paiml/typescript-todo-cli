// The package holds only what users need: the built dist/ files, plus the
// package.json and README.md npm always adds. No source, no tests.
import assert from "node:assert/strict";
import { run, show } from "./helpers.ts";

const out = run("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"]);
assert.equal(out.code, 0, out.stderr);
const [pack] = JSON.parse(out.stdout) as { files: { path: string }[] }[];
const files = pack!.files.map((f) => f.path).sort();
const outside = files.filter((f) => !f.startsWith("dist/"));
assert.deepEqual(outside, ["README.md", "package.json"]);
assert.ok(files.includes("dist/cli.mjs"));
assert.ok(!files.some((f) => f.startsWith("src/") || f.includes(".test")));
show("files in the package:", files.length);
show("outside dist/:", outside.join(", "));
show("source or tests:", "none");

console.log("contract: package files (only dist/, package.json and README.md) OK");
