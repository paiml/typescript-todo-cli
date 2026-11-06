// The exit code tells a script what happened: 0 it worked, 1 it failed,
// 2 the command line was wrong.
import assert from "node:assert/strict";
import { scratchFile, show, todo } from "./helpers.ts";

const file = scratchFile();
const cases: [string, string[], number][] = [
  ["list", ["list"], 0],
  ["add buy milk", ["add", "buy milk"], 0],
  ["done 99", ["done", "99"], 1],
  ["samples/broken.json", ["list", "--file", "samples/broken.json"], 1],
  ["no command", [], 2],
  ["add with no title", ["add"], 2],
  ["--colour", ["list", "--colour"], 2],
];
for (const [label, args, expected] of cases) {
  const result = todo(...args, ...(args.includes("--file") ? [] : ["--file", file]));
  assert.equal(result.code, expected, `${label}: ${result.stderr}`);
  show(`${label}:`, `exit ${result.code}`);
}

console.log("contract: exit codes (0 worked, 1 failed, 2 wrong command line) OK");
