// saveTodos writes the list as JSON, two spaces per level, and reading it
// back gives the same todos.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadTodos } from "../src/load.ts";
import { saveTodos } from "../src/save.ts";
import { scratchFile, show, todo } from "./helpers.ts";

const file = scratchFile();
const todos = [{ id: 1, title: "buy milk", done: false }];
await saveTodos(file, todos);
const text = readFileSync(file, "utf8");
assert.equal(text, JSON.stringify(todos, null, 2) + "\n");
show("saveTodos wrote:", `${text.split("\n").length - 1} lines of JSON`);
assert.deepEqual(await loadTodos(file), todos);
show("read back:", "the same todos");

const cli = scratchFile();
todo("add", "buy milk", "--file", cli);
assert.equal(readFileSync(cli, "utf8"), text);
show("todo add buy milk wrote:", "the same file");

console.log("contract: save (writes JSON that reads back the same) OK");
