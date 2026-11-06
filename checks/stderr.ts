// Errors go to standard error and results to standard output, so sending
// the output to a file (or another program) never captures an error.
import assert from "node:assert/strict";
import { scratchFile, show, todo } from "./helpers.ts";

const file = scratchFile();
todo("add", "buy milk", "--file", file);

const failed = todo("done", "99", "--file", file);
assert.equal(failed.stdout, "");
assert.equal(failed.stderr, "todo: no todo with id 99\n");
show("done 99, stdout:", "empty");
show("done 99, stderr:", failed.stderr.trim());

const listed = todo("list", "--file", file);
assert.equal(listed.stderr, "");
assert.equal(listed.stdout, "[ ] 1. buy milk\n");
show("list, stdout:", listed.stdout.trim());
show("list, stderr:", "empty");

console.log("contract: stderr (errors on stderr, results on stdout) OK");
