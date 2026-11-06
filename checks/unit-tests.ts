// The unit tests pass, and they would catch a markDone that marks the
// wrong todo: in a copy of the project with that bug, they fail.
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectCopy, remove, run, show } from "./helpers.ts";

const passing = run("node", ["--test", "src/todos.test.ts"]);
assert.equal(passing.code, 0, passing.stdout);
assert.match(passing.stdout, /ℹ pass 3\nℹ fail 0/);
show("node --test src/todos.test.ts:", "3 pass, 0 fail");

const copy = projectCopy("unit-tests");
const todos = join(copy, "src/todos.ts");
writeFileSync(todos, readFileSync(todos, "utf8").replace("todo.id === id ?", "todo.id !== id ?"));
const failing = run("node", ["--test", "src/todos.test.ts"], copy);
remove(copy);
assert.notEqual(failing.code, 0);
assert.match(failing.stdout, /ℹ fail 1/);
show("with markDone broken:", "1 test fails");

console.log("contract: unit tests (3 pass, and a broken markDone fails one) OK");
