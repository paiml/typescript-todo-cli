// Every check program must exit 0 and print its `contract: … OK` line. A demo
// can only be recorded when its contract holds, so this is the same gate, run
// for all of them at once with `npm run contracts`. They run one at a time.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";

// [check program, start of its contract line]
const checks: [string, string][] = [
  ["checks/starter.ts", "contract: starter"],
  ["checks/brief.ts", "contract: todo brief"],
  ["checks/parse-args.ts", "contract: parse args"],
  ["checks/defaults.ts", "contract: defaults"],
  ["checks/usage.ts", "contract: usage"],
  ["checks/commands.ts", "contract: commands"],
  ["checks/stderr.ts", "contract: stderr"],
  ["checks/exit-codes.ts", "contract: exit codes"],
  ["checks/load.ts", "contract: load"],
  ["checks/zod.ts", "contract: zod"],
  ["checks/missing-file.ts", "contract: missing file"],
  ["checks/save.ts", "contract: save"],
  ["checks/add.ts", "contract: add"],
  ["checks/done.ts", "contract: done"],
  ["checks/text-output.ts", "contract: text output"],
  ["checks/json-output.ts", "contract: json output"],
  ["checks/friendly-errors.ts", "contract: friendly errors"],
  ["checks/unit-tests.ts", "contract: unit tests"],
  ["checks/spawn-tests.ts", "contract: spawn tests"],
  ["checks/coverage.ts", "contract: coverage"],
  ["checks/type-tests.ts", "contract: type tests"],
  ["checks/lint.ts", "contract: lint"],
  ["checks/format.ts", "contract: format"],
  ["checks/check-script.ts", "contract: check script"],
  ["checks/broken.ts", "contract: broken"],
  ["checks/fixed.ts", "contract: fixed"],
  ["checks/build.ts", "contract: build"],
  ["checks/bin.ts", "contract: bin"],
  ["checks/package-files.ts", "contract: package files"],
  ["checks/pack.ts", "contract: pack"],
  ["checks/install.ts", "contract: install"],
  ["checks/installed.ts", "contract: installed"],
  ["checks/publish.ts", "contract: publish dry run"],
];

for (const [program, contract] of checks) {
  test(program, () => {
    const out = execFileSync("node", [program], { encoding: "utf8" });
    assert.match(out, new RegExp(`^${contract}.* OK$`, "m"));
  });
}
