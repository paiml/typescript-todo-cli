// A todo file that doesn't exist yet means no todos yet: list says so, the
// JSON is an empty array, and listing doesn't create the file.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { scratchFile, show, todo } from "./helpers.ts";

const file = scratchFile();
assert.equal(existsSync(file), false);
const text = todo("list", "--file", file);
assert.deepEqual([text.code, text.stdout], [0, "no todos yet\n"]);
show("list:", "no todos yet, exit 0");
const json = todo("list", "--json", "--file", file);
assert.deepEqual(JSON.parse(json.stdout), []);
show("list --json:", "[]");
assert.equal(existsSync(file), false);
show("file created by list:", "none");

console.log("contract: missing file (no todos yet, [] as JSON, no file made) OK");
