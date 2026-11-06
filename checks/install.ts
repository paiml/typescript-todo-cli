// The tarball installs in a folder of its own: npm adds ts7-todo and zod,
// its one dependency, and a todo command in node_modules/.bin.
import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { remove, run, show } from "./helpers.ts";

const top = resolve(".check-install");
remove(top);
const dir = join(top, "consumer"); // npm init needs a folder name without a dot
mkdirSync(dir, { recursive: true });
run("npm", ["pack", "--pack-destination", dir]);
run("npm", ["init", "-y"], dir);
assert.ok(existsSync(join(dir, "package.json")), "npm init wrote package.json");
const install = run("npm", ["install", "./ts7-todo-0.1.0.tgz"], dir);
assert.equal(install.code, 0, install.stderr);

const version = (name: string) =>
  JSON.parse(readFileSync(join(dir, "node_modules", name, "package.json"), "utf8")).version;
assert.equal(version("ts7-todo"), "0.1.0");
assert.equal(version("zod"), "4.6.7");
show("installed:", "ts7-todo 0.1.0, zod 4.6.7");
assert.ok(existsSync(join(dir, "node_modules/.bin/todo")));
show("command:", "node_modules/.bin/todo");
assert.equal(existsSync(join(dir, "node_modules/typescript")), false);
show("dev tools installed with it:", "none");
remove(top);

console.log("contract: install (the tarball installs a todo command, with zod) OK");
