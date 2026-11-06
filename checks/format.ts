// Prettier's check passes on src, and fails on a copy of format.ts saved
// without formatting; formatting that copy gives back src/format.ts exactly.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, show } from "./helpers.ts";

const src = run("npx", ["prettier", "--check", "src"]);
assert.equal(src.code, 0, src.stdout + src.stderr);
show("prettier --check src:", "all files formatted");

const messy = run("npx", ["prettier", "--check", "mistakes/format.ts"]);
assert.equal(messy.code, 1);
assert.match(messy.stderr, /\[warn\] mistakes\/format\.ts/);
show("prettier --check mistakes/format.ts:", "needs formatting");

const fixed = run("npx", ["prettier", "mistakes/format.ts"]);
assert.equal(fixed.stdout, readFileSync("src/format.ts", "utf8"));
show("formatted, it equals:", "src/format.ts");

console.log("contract: format (src passes, the unformatted copy fails) OK");
