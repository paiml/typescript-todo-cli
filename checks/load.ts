// loadTodos reads the file, parses the JSON and returns the todos in it.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTodos } from "../src/load.ts";
import { show, todo } from "./helpers.ts";

const todos = await loadTodos("samples/todos.json");
assert.deepEqual(todos, JSON.parse(readFileSync("samples/todos.json", "utf8")));
assert.equal(todos.length, 3);
show("loadTodos(samples/todos.json):", `${todos.length} todos`);
show("titles:", todos.map((t) => t.title).join(", "));

const listed = todo("list", "--file", "samples/todos.json");
assert.equal(listed.stdout.trim().split("\n").length, 3);
show("list --file samples/todos.json:", "3 lines");

console.log("contract: load (samples/todos.json reads as 3 todos) OK");
