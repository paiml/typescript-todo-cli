// Each kind of mistake makes npm run check fail at its own step, and the
// steps after it never run. Each mistake is made in a formatted copy of the
// project, so this works even while src/format.ts is the unformatted one.
import assert from "node:assert/strict";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { projectCopy, remove, run, show } from "./helpers.ts";

process.env.NO_COLOR = "1"; // plain text, so the output can be matched
const steps = ["typecheck", "lint", "format", "test", "typetest"];
const mistakes: [string, string, (dir: string) => void][] = [
  ["a type error", "typecheck", (dir) => edit(dir, "src/todos.ts", "): number {", "): string {")],
  ["a missing await", "lint", (dir) => edit(dir, "src/save.ts", "await writeFile", "writeFile")],
  ["unformatted format.ts", "format", (dir) => copyFileSync("mistakes/format.ts", join(dir, "src/format.ts"))],
  ["a wrong next id", "test", (dir) => edit(dir, "src/todos.ts", ")) + 1;", ")) + 2;")],
];

function edit(dir: string, file: string, from: string, to: string): void {
  const path = join(dir, file);
  const text = readFileSync(path, "utf8");
  assert.ok(text.includes(from), `${file} contains ${from}`);
  writeFileSync(path, text.replace(from, to));
}

for (const [label, step, make] of mistakes) {
  const copy = projectCopy("broken");
  run("npx", ["prettier", "--write", "src"], copy); // start from a clean copy
  make(copy);
  const check = run("npm", ["run", "check"], copy);
  remove(copy);
  assert.notEqual(check.code, 0, `${label} must fail the check`);
  const ran = steps.filter((name) => check.stdout.includes(`> ts7-todo@0.1.0 ${name}\n`));
  assert.equal(ran.at(-1), step, `${label} stops at ${step}`);
  show(`${label}:`, `stops at ${step}`);
}

console.log("contract: broken (each kind of mistake stops npm run check) OK");
