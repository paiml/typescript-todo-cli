// tsdown builds the CLI and the public functions into dist/ as JavaScript,
// with type declarations next to them, and the built CLI runs.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { run, show, todo } from "./helpers.ts";

if (!existsSync("dist/cli.mjs")) run("npm", ["run", "build"]);
for (const file of ["cli.mjs", "todos.mjs", "todos.d.mts"]) {
  assert.ok(existsSync(`dist/${file}`), `dist/${file} was built`);
}
show("dist/:", "cli.mjs, todos.mjs, todos.d.mts");

const types = readFileSync("dist/todos.d.mts", "utf8");
for (const name of ["addTodo", "markDone", "nextId"]) {
  assert.match(types, new RegExp(`export declare function ${name}\\(`));
}
assert.doesNotMatch(readFileSync("dist/todos.mjs", "utf8"), /: Todo\[\]/);
show("todos.d.mts declares:", "addTodo, markDone, nextId");

const built = run("node", ["dist/cli.mjs", "list", "--file", "samples/todos.json"]);
assert.equal(built.stdout, todo("list", "--file", "samples/todos.json").stdout);
show("node dist/cli.mjs list:", "same output as the source");

console.log("contract: build (dist has the CLI, the functions and their types) OK");
