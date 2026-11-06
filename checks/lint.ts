// tsc and oxlint's plain rules accept a missing await; only the type-aware
// rule finds it. The project's own code lints clean.
import assert from "node:assert/strict";
import { run, show } from "./helpers.ts";

const tsc = run("npx", ["tsc", "-p", "mistakes"]);
assert.equal(tsc.code, 0, tsc.stdout);
show("npx tsc -p mistakes:", "0 errors");

const plain = run("npx", ["oxlint", "mistakes/clear.ts"]);
assert.equal(plain.code, 0, plain.stdout);
assert.match(plain.stdout, /Found 0 warnings and 0 errors/);
show("oxlint:", "0 errors");

const typed = run("npx", ["oxlint", "--type-aware", "mistakes/clear.ts"]);
assert.equal(typed.code, 1);
assert.match(typed.stdout, /no-floating-promises/);
assert.match(typed.stdout, /mistakes\/clear\.ts:9:3/);
show("oxlint --type-aware:", "no-floating-promises at line 9");

const src = run("npm", ["run", "lint"]);
assert.equal(src.code, 0, src.stdout);
show("npm run lint (src):", "0 errors");

console.log("contract: lint (only type-aware lint finds the missing await) OK");
