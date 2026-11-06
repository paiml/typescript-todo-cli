// package.json's bin field names the built CLI, which starts with a shebang
// and is executable, so it runs on its own like any other command.
import assert from "node:assert/strict";
import { accessSync, constants, existsSync, readFileSync } from "node:fs";
import { run, show } from "./helpers.ts";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
assert.deepEqual(pkg.bin, { todo: "dist/cli.mjs" });
show("bin:", "todo -> dist/cli.mjs");

if (!existsSync("dist/cli.mjs")) run("npm", ["run", "build"]);
const firstLine = readFileSync("dist/cli.mjs", "utf8").split("\n")[0];
assert.equal(firstLine, "#!/usr/bin/env node");
show("first line:", firstLine ?? "");
accessSync("dist/cli.mjs", constants.X_OK);
show("executable:", "yes");

const direct = run("./dist/cli.mjs", ["list", "--file", "samples/todos.json"]);
assert.equal(direct.code, 0, direct.stderr);
assert.equal(direct.stdout.split("\n")[0], "[x] 1. buy milk");
show("./dist/cli.mjs list:", "runs, 3 todos");

console.log("contract: bin (dist/cli.mjs has a shebang and runs on its own) OK");
