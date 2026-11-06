// Installed from the tarball, the todo command works with no TypeScript and
// no source: it adds, lists and reports errors as the source does.
import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { remove, run, show } from "./helpers.ts";

const top = resolve(".check-installed");
remove(top);
const dir = join(top, "consumer"); // npm init needs a folder name without a dot
mkdirSync(dir, { recursive: true });
run("npm", ["pack", "--pack-destination", dir]);
run("npm", ["init", "-y"], dir);
assert.ok(existsSync(join(dir, "package.json")), "npm init wrote package.json");
run("npm", ["install", "./ts7-todo-0.1.0.tgz"], dir);
const todo = (...args: string[]) => run("npx", ["todo", ...args], dir);

assert.equal(todo("add", "buy milk").stdout, "added 1: buy milk\n");
assert.equal(todo("list").stdout, "[ ] 1. buy milk\n");
assert.ok(existsSync(join(dir, "todos.json")));
show("npx todo add, list:", "added 1, listed, todos.json written");
const missing = todo("done", "99");
assert.deepEqual([missing.code, missing.stderr], [1, "todo: no todo with id 99\n"]);
show("npx todo done 99:", "stderr, exit 1");
remove(top);

console.log("contract: installed (the installed todo adds, lists and fails cleanly) OK");
