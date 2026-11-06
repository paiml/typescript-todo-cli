// add gives the new todo the next id after the highest one, saves it, and
// refuses an empty title with exit code 2.
import assert from "node:assert/strict";
import { copyFileSync } from "node:fs";
import { loadTodos } from "../src/load.ts";
import { addTodo } from "../src/todos.ts";
import { scratchFile, show, todo } from "./helpers.ts";

const after = addTodo([{ id: 7, title: "call the bank", done: true }], "buy milk");
assert.deepEqual(after[1], { id: 8, title: "buy milk", done: false });
show("addTodo after id 7:", "id 8");

const file = scratchFile();
copyFileSync("samples/todos.json", file);
assert.equal(todo("add", "book", "the", "dentist", "--file", file).stdout, "added 4: book the dentist\n");
assert.equal((await loadTodos(file)).length, 4);
show("add to the sample list:", "id 4, saved with the other 3");

const empty = todo("add", "--file", file);
assert.deepEqual([empty.code, empty.stderr], [2, "todo: add needs a title\n"]);
show("add with no title:", "exit 2");

console.log("contract: add (next id, saved, and a title is required) OK");
