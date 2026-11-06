// The CLI tests run the real program as a child process and check what it
// prints, where it prints it, and its exit code.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, show } from "./helpers.ts";

const source = readFileSync("src/cli.test.ts", "utf8");
assert.match(source, /\["src\/cli\.ts"/);
assert.match(source, /spawnSync\("node", cli/);
show("src/cli.test.ts runs:", "node src/cli.ts, with spawnSync");

const tests = run("node", ["--test", "src/cli.test.ts"]);
assert.equal(tests.code, 0, tests.stdout);
assert.match(tests.stdout, /ℹ pass 3\nℹ fail 0/);
show("node --test src/cli.test.ts:", "3 pass, 0 fail");
for (const name of ["stdout", "stderr", "status"]) {
  assert.ok(source.includes(`.${name}`), `the tests check ${name}`);
}
show("checked:", "stdout, stderr and the exit code");

console.log("contract: spawn tests (the CLI's output and exit codes, tested) OK");
