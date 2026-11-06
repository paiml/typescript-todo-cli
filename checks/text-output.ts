// The plain text list has one line per todo: a box, the id and the title,
// with [x] when it's done.
import assert from "node:assert/strict";
import { formatList, formatTodo } from "../src/format.ts";
import { show, todo } from "./helpers.ts";

assert.equal(formatTodo({ id: 1, title: "buy milk", done: true }), "[x] 1. buy milk");
assert.equal(formatTodo({ id: 2, title: "walk the dog", done: false }), "[ ] 2. walk the dog");
show("done / open:", "[x] / [ ]");
assert.equal(formatList([]), "no todos yet");
show("an empty list:", "no todos yet");

const out = todo("list", "--file", "samples/todos.json").stdout;
assert.equal(out, "[x] 1. buy milk\n[ ] 2. walk the dog\n[ ] 3. call the bank\n");
show("samples/todos.json:", "3 lines");

console.log("contract: text output (one line per todo, [x] when done) OK");
