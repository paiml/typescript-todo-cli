// npm run check runs every check in order, stopping at the first failure:
// type check, lint, format, unit and CLI tests, type tests. All pass.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, show } from "./helpers.ts";

const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts;
const steps = scripts.check.split(" && ");
assert.deepEqual(steps, [
  "npm run typecheck",
  "npm run lint",
  "npm run format",
  "npm test",
  "npm run typetest",
]);
show("steps in npm run check:", steps.length);

process.env.NO_COLOR = "1"; // plain text, so the output can be matched
const check = run("npm", ["run", "check"]);
assert.equal(check.code, 0, check.stdout + check.stderr);
for (const name of ["typecheck", "lint", "format", "test", "typetest"]) {
  assert.match(check.stdout, new RegExp(`> ts7-todo@0.1.0 ${name}\n`), `${name} ran`);
}
show("npm run check:", "all 5 ran, exit 0");

console.log("contract: check script (5 steps, all pass) OK");
