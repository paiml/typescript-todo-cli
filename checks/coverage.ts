// Node's test runner measures coverage, the CLI runs included: every source
// file is in the report, and the tests run more than 80% of all lines.
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { run, show } from "./helpers.ts";

const out = run("node", ["--test", "--experimental-test-coverage", "src/*.test.ts"]).stdout;
const sources = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((f) => f.endsWith(".ts") && !f.includes(".test"))
  .map((f) => f.split("/").at(-1)!);
for (const file of sources) {
  assert.match(out, new RegExp(` ${file.replace(".", "\\.")} +\\|`), `${file} is in the report`);
}
show("source files in the report:", sources.length);
const all = out.match(/all files +\| +([\d.]+) \|/);
assert.ok(all, "the report has an all files line");
const lines = Number(all[1]);
assert.ok(lines > 80, `line coverage ${lines}% is over 80%`);
show("all files, line %:", lines.toFixed(2));

console.log("contract: coverage (every source file measured, over 80% of lines) OK");
