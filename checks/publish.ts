// npm publish --dry-run goes through every step of a publish except the
// upload: it builds, lists the tarball, and says (dry-run). Nothing is sent.
import assert from "node:assert/strict";
import { run, show } from "./helpers.ts";

const out = run("npm", ["publish", "--dry-run"]);
assert.equal(out.code, 0, out.stderr);
const log = out.stdout + out.stderr;
assert.match(log, /Tarball Contents/);
assert.match(log, /dist\/cli\.mjs/);
assert.match(log, /\(dry-run\)/);
assert.match(log, /\+ ts7-todo@0\.1\.0/);
const files = Number(log.match(/total files: (\d+)/)?.[1]);
show("tarball listed:", `${files} files`);
show("would publish:", "ts7-todo@0.1.0");
show("sent to the registry:", "nothing (dry-run)");

console.log("contract: publish dry run (every step but the upload) OK");
