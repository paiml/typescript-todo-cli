// Every mistake gets a short "todo: ..." message on standard error, never a
// stack trace, and a non-zero exit code.
import assert from "node:assert/strict";
import { show, todo } from "./helpers.ts";

const cases: [string, string[], string][] = [
  ["done 4", ["done", "4", "--file", "samples/todos.json"], "todo: no todo with id 4"],
  ["done", ["done", "--file", "samples/todos.json"], "todo: done needs an id"],
];
for (const [label, args, message] of cases) {
  const result = todo(...args);
  assert.notEqual(result.code, 0);
  assert.equal(result.stderr, message + "\n");
  assert.doesNotMatch(result.stderr, /at .*\.ts:\d+/);
  show(`${label}:`, `${message}, exit ${result.code}`);
}

console.log("contract: friendly errors (one line on stderr, no stack trace) OK");
