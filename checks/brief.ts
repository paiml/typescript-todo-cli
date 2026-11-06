// Runs the todo CLI against every rule in BRIEF.md, in a scratch file.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { scratchFile, todo } from "./helpers.ts";

const file = scratchFile();
const rules: [string, () => void][] = [
  ["1 add prints the new id", () => {
    assert.equal(todo("add", "buy milk", "--file", file).stdout, "added 1: buy milk\n");
  }],
  ["2 done marks it done", () => {
    assert.equal(todo("done", "1", "--file", file).code, 0);
  }],
  ["3 list prints one line each", () => {
    assert.equal(todo("list", "--file", file).stdout, "[x] 1. buy milk\n");
  }],
  ["4 list --json prints JSON", () => {
    const json = JSON.parse(todo("list", "--json", "--file", file).stdout);
    assert.deepEqual(json, [{ id: 1, title: "buy milk", done: true }]);
  }],
  ["5 --file defaults to todos.json", () => {
    assert.match(todo("--help").stdout, /default: todos\.json/);
  }],
  ["6 a missing file means no todos", () => {
    const missing = scratchFile();
    assert.equal(todo("list", "--file", missing).stdout, "no todos yet\n");
    assert.equal(existsSync(missing), false);
  }],
  ["7 a bad file is an error", () => {
    const bad = todo("list", "--file", "samples/broken.json");
    assert.equal(bad.code, 1);
    assert.match(bad.stderr, /^todo: samples\/broken.json is not a todo file/);
  }],
  ["8 errors go to stderr", () => {
    const missing = todo("done", "99", "--file", file);
    assert.deepEqual([missing.stdout, missing.stderr], ["", "todo: no todo with id 99\n"]);
  }],
  ["9 exit codes 0, 1 and 2", () => {
    const codes = [todo("list", "--file", file), todo("done", "99", "--file", file), todo()];
    assert.deepEqual(codes.map((r) => r.code), [0, 1, 2]);
  }],
];

for (const [rule, check] of rules) {
  check();
  console.log(`ok  rule ${rule}`);
}
console.log(`contract: todo brief (all ${rules.length} rules hold) OK`);
