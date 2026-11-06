// add, done and list work together on one todo file.
import assert from "node:assert/strict";
import { scratchFile, show, todo } from "./helpers.ts";

const file = scratchFile();
assert.equal(todo("add", "buy", "milk", "--file", file).stdout, "added 1: buy milk\n");
assert.equal(todo("add", "walk", "the", "dog", "--file", file).stdout, "added 2: walk the dog\n");
show("add twice:", "ids 1 and 2");
assert.equal(todo("done", "1", "--file", file).stdout, "done: 1\n");
show("done 1:", "marked");
const list = todo("list", "--file", file).stdout;
assert.equal(list, "[x] 1. buy milk\n[ ] 2. walk the dog\n");
show("list:", "1 done, 2 open");

console.log("contract: commands (add, done and list share one file) OK");
