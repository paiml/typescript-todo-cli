// The type tests pass, and they catch a wrong type: in a copy where markDone
// accepts a string id, vitest reports a type error in that test.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectCopy, remove, run, show } from "./helpers.ts";

const vitest = (cwd: string) =>
  run("npx", ["vitest", "run", "--typecheck.only"], cwd);
process.env.NO_COLOR = "1"; // plain text, so the output can be matched

const passing = vitest(".");
assert.equal(passing.code, 0, passing.stdout);
assert.match(passing.stdout, /Tests +3 passed/);
assert.match(passing.stdout, /Type Errors +no errors/);
show("npx vitest run --typecheck.only:", "3 passed, no type errors");

const copy = projectCopy("type-tests");
const todos = join(copy, "src/todos.ts");
const text = readFileSync(todos, "utf8");
writeFileSync(todos, text.replace("id: number): Todo", "id: number | string): Todo"));
const failing = vitest(copy);
remove(copy);
assert.notEqual(failing.code, 0);
assert.match(failing.stdout + failing.stderr, /TypeCheckError/);
assert.match(failing.stdout, /Tests +1 failed \| 2 passed/);
show("with a string id allowed:", "1 failed, TypeCheckError");

console.log("contract: type tests (3 pass, and a wrong type fails) OK");
