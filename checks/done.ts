// done marks only the todo with that id, saves the file, and leaves the
// input list as it was.
import assert from "node:assert/strict";
import { copyFileSync } from "node:fs";
import { loadTodos } from "../src/load.ts";
import { markDone } from "../src/todos.ts";
import { scratchFile, show, todo } from "./helpers.ts";

const file = scratchFile();
copyFileSync("samples/todos.json", file);
const before = await loadTodos(file);
assert.equal(todo("done", "2", "--file", file).stdout, "done: 2\n");
const after = await loadTodos(file);
assert.deepEqual(after.map((t) => t.done), [true, true, false]);
assert.deepEqual(after.map((t) => t.title), before.map((t) => t.title));
show("done 2:", "todo 2 done, 1 and 3 unchanged");

const original = structuredClone(before);
markDone(before, 3);
assert.deepEqual(before, original);
show("markDone:", "returns a new list");

console.log("contract: done (only that todo changes, and it is saved) OK");
