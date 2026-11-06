// --help prints the usage on standard output and exits 0; a command line the
// CLI can't read gets a short message on standard error and exit code 2.
import assert from "node:assert/strict";
import { usage } from "../src/usage.ts";
import { show, todo } from "./helpers.ts";

const help = todo("--help");
assert.deepEqual([help.code, help.stdout, help.stderr], [0, usage + "\n", ""]);
show("--help:", "usage on stdout, exit 0");

const unknown = todo("list", "--colour");
assert.equal(unknown.code, 2);
assert.equal(unknown.stdout, "");
assert.equal(unknown.stderr, "todo: Unknown option '--colour'\ntry: todo --help\n");
show("--colour:", "one line and a hint on stderr, exit 2");

const nothing = todo();
assert.deepEqual([nothing.code, nothing.stdout, nothing.stderr], [2, "", usage + "\n"]);
show("no command:", "usage on stderr, exit 2");

console.log("contract: usage (--help on stdout with 0, mistakes on stderr with 2) OK");
