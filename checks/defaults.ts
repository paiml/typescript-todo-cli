// An option with a default is typed as always present; one without a
// default may be undefined, so tsc refuses to treat it as a string.
import assert from "node:assert/strict";
import { readArgs } from "../src/args.ts";
import { run, show } from "./helpers.ts";

const tsc = run("npx", ["tsc", "-p", "examples", "--pretty", "false"]);
const errors = tsc.stdout.split("\n").filter((line) => line.includes("error TS"));
assert.equal(errors.length, 1, tsc.stdout);
assert.match(errors[0]!, /^examples\/defaults\.ts\(14,7\): error TS2322: Type 'string \| undefined'/);
show("owner, no default:", "TS2322, string | undefined");

const run1 = run("node", ["examples/defaults.ts"]);
assert.match(run1.stdout, /file: 'todos.json', json: false, owner: undefined/);
show("file and json, with defaults:", "todos.json, false");

const args = readArgs(["list"]);
assert.deepEqual([args.file, args.json, args.help], ["todos.json", false, false]);
show("src/args.ts readArgs([\"list\"]):", "file todos.json, json false");

console.log("contract: defaults (a default makes it a string; TS2322 without one) OK");
