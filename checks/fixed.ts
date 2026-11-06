// After prettier --write, src/format.ts is formatted again, it is the same
// code as before, and npm run check passes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { run, show } from "./helpers.ts";

const formatted = run("npx", ["prettier", "mistakes/format.ts"]).stdout;
assert.equal(readFileSync("src/format.ts", "utf8"), formatted);
show("src/format.ts:", "formatted, same code");

process.env.NO_COLOR = "1"; // plain text, so the output can be matched
const check = run("npm", ["run", "check"]);
assert.equal(check.code, 0, check.stdout + check.stderr);
show("npm run check:", "exit 0");

console.log("contract: fixed (format.ts formatted again, the check passes) OK");
