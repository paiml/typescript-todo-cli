// The todo file is checked with Zod when it is read: a file with the wrong
// shape is refused with exit code 1 and a message naming each bad field.
import assert from "node:assert/strict";
import { TodoFile } from "../src/schema.ts";
import { show, todo } from "./helpers.ts";

const good = TodoFile.safeParse([{ id: 1, title: "buy milk", done: false }]);
assert.equal(good.success, true);
show("a valid todo:", "accepted");

const bad = todo("list", "--file", "samples/broken.json");
assert.equal(bad.code, 1);
assert.equal(bad.stdout, "");
assert.match(bad.stderr, /expected number, received string\n  → at \[1\]\.id/);
assert.match(bad.stderr, /expected boolean, received undefined\n  → at \[1\]\.done/);
show("samples/broken.json:", "refused, exit 1");
show("fields named:", "[1].id, [1].done");

console.log("contract: zod (a bad file is refused with exit 1, naming each field) OK");
