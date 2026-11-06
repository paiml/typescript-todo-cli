// npm pack builds the package and writes ts7-todo-0.1.0.tgz, which holds
// the built CLI under package/.
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { remove, run, show } from "./helpers.ts";

const dir = resolve(".check-pack");
remove(dir);
mkdirSync(dir);
const packed = run("npm", ["pack", "--pack-destination", dir]);
assert.equal(packed.code, 0, packed.stderr);
assert.equal(packed.stdout.trim().split("\n").at(-1), "ts7-todo-0.1.0.tgz");
show("npm pack wrote:", "ts7-todo-0.1.0.tgz");

const listing = run("tar", ["-tzf", join(dir, "ts7-todo-0.1.0.tgz")]).stdout;
remove(dir);
assert.match(listing, /^package\/dist\/cli\.mjs$/m);
assert.match(listing, /^package\/package\.json$/m);
show("inside it:", "package/dist/cli.mjs, package/package.json");

console.log("contract: pack (ts7-todo-0.1.0.tgz holds the built CLI) OK");
