// Node's argument parser puts options in values and everything else, in
// order, in positionals.
import assert from "node:assert/strict";
import { run, show } from "./helpers.ts";

const out = run("node", ["examples/parse.ts", "add", "buy", "milk", "--file", "work.json"]);
assert.equal(out.code, 0, out.stderr);
const [values, positionals] = out.stdout.trim().split("\n").map((line) => JSON.parse(line.slice(line.indexOf(" ")).trim()));
assert.deepEqual(values, { file: "work.json" });
assert.deepEqual(positionals, ["add", "buy", "milk"]);
show("--file work.json:", `values.file = ${values.file}`);
show("add buy milk:", `positionals = ${JSON.stringify(positionals)}`);

const flag = run("node", ["examples/parse.ts", "list", "--json"]);
const flagValues = JSON.parse(flag.stdout.split("\n")[0]!.slice(12));
assert.deepEqual(flagValues, { json: true });
show("--json:", "values.json = true");

const unknown = run("node", ["examples/parse.ts", "--colour"]);
assert.notEqual(unknown.code, 0);
assert.match(unknown.stderr, /ERR_PARSE_ARGS_UNKNOWN_OPTION/);
show("--colour:", "refused, unknown option");

console.log("contract: parse args (options in values, the rest in positionals) OK");
