// Runs the real CLI as its own program, and checks what it prints and returns.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

const file = join(mkdtempSync(join(tmpdir(), "todo-")), "todos.json");

function todo(...args: string[]) {
  const cli = ["src/cli.ts", ...args, "--file", file];
  return spawnSync("node", cli, { encoding: "utf8" });
}

test("add, done and list", () => {
  assert.equal(todo("add", "buy milk").stdout, "added 1: buy milk\n");
  assert.equal(todo("done", "1").status, 0);
  assert.equal(todo("list").stdout, "[x] 1. buy milk\n");
});

test("an unknown id goes to stderr, with exit code 1", () => {
  const result = todo("done", "99");
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, "todo: no todo with id 99\n");
  assert.equal(result.status, 1);
});

test("no command prints the usage, with exit code 2", () => {
  assert.equal(todo().status, 2);
});
