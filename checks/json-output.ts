// --json prints exactly the todos in the file, as JSON another program can
// read from a pipe.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { show, todo } from "./helpers.ts";

const out = todo("list", "--json", "--file", "samples/todos.json").stdout;
assert.deepEqual(JSON.parse(out), JSON.parse(readFileSync("samples/todos.json", "utf8")));
show("list --json:", "the same 3 todos as the file");

const counted = spawnSync("node", ["examples/count-open.ts"], {
  input: out,
  encoding: "utf8",
});
assert.equal(counted.stdout, "open: 2 of 3\n");
show("piped into count-open.ts:", counted.stdout.trim());

console.log("contract: json output (the same todos, read by another program) OK");
