// Helpers the check programs share: run a program, make a scratch file,
// copy the project somewhere safe to break it.
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

export type Result = { code: number | null; stdout: string; stderr: string };

// Runs a program and keeps what it printed, without a shell. When a check
// itself runs under node --test, the test runner it starts must not think
// it is part of that run, so NODE_TEST_CONTEXT is left out.
export function run(command: string, args: string[], cwd = "."): Result {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(command, args, { cwd, env, encoding: "utf8" });
  return { code: result.status, stdout: result.stdout, stderr: result.stderr };
}

// Runs the todo CLI from source.
export function todo(...args: string[]): Result {
  return run("node", [resolve("src/cli.ts"), ...args]);
}

// A path to a todo file that does not exist yet, in a fresh scratch folder
// that is removed when the check ends.
export function scratchFile(name = "todos.json"): string {
  const dir = mkdtempSync(join(tmpdir(), "todo-check-"));
  process.on("exit", () => rmSync(dir, { recursive: true, force: true }));
  return join(dir, name);
}

// A copy of the project in a scratch folder (removed by the caller with
// remove()), sharing node_modules, so it can be broken safely.
export function projectCopy(name: string): string {
  const dir = mkdtempSync(join(tmpdir(), `todo-${name}-`));
  for (const file of [
    "src",
    "package.json",
    "tsconfig.json",
    ".oxlintrc.json",
    "tsdown.config.ts",
  ]) {
    cpSync(file, join(dir, file), { recursive: true });
  }
  symlinkSync(resolve("node_modules"), join(dir, "node_modules"));
  return dir;
}

export function remove(dir: string): void {
  rmSync(dir, { recursive: true, force: true });
}

// One line of what the check found, lined up.
export function show(label: string, value: string | number): void {
  console.log(`${label.padEnd(34)} ${value}`);
}
