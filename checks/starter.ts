// The repository starts ready to work in: every package pinned to an exact
// version, those versions installed, and TypeScript 7 checking the code clean.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, show } from "./helpers.ts";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const pins: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies };

for (const [name, version] of Object.entries(pins)) {
  assert.match(version, /^\d+\.\d+\.\d+$/, `${name} must be pinned exactly`);
  const installed = JSON.parse(readFileSync(`node_modules/${name}/package.json`, "utf8"));
  assert.equal(installed.version, version, `${name} must be installed at ${version}`);
}
show("packages pinned and installed:", Object.keys(pins).length);
show("typescript:", pins.typescript ?? "missing");
assert.equal(pins.typescript, "7.0.2");

const tsc = run("npx", ["tsc"]);
assert.equal(tsc.code, 0, tsc.stdout);
show("npx tsc:", "0 errors");

console.log(`contract: starter (${Object.keys(pins).length} packages pinned exactly, tsc 7.0.2 checks clean) OK`);
