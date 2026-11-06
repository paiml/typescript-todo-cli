# ts7-todo

A todo list for the command line, written in TypeScript 7, tested, built
with tsdown and packed with npm. Everything in it is pinned to an exact
version (**typescript 7.0.2**, zod 4.6.7, …), with `package-lock.json`
committed, so you install exactly what the videos show.

```bash
todo add buy milk        # added 1: buy milk
todo done 1              # done: 1
todo list                # [x] 1. buy milk
todo list --json         # the same list, as JSON
todo --help
```

## Requirements

- Node.js 22.18 or later (the videos use 25.1.0), which runs `.ts` files directly
- npm (comes with Node.js)

## Setup

```bash
git clone https://github.com/paiml/typescript-todo-cli.git
cd typescript-todo-cli
npm ci                   # the pinned packages, from package-lock.json
npm run check            # type check, lint, format, tests and type tests
npm run contracts        # every check program in checks/, and its contract
```

`.npmrc` sets `legacy-peer-deps=true`: tsdown and Vitest need it to install
beside TypeScript 7 (an npm resolver issue, not a TypeScript one).

## What is where

| Path | What it holds |
|---|---|
| `BRIEF.md` | What the CLI must do |
| `src/` | The CLI: `cli.ts` starts it, `run.ts` picks the command, `commands/` holds them |
| `src/*.test.ts`, `src/*.test-d.ts` | Unit tests, CLI tests (`npm test`) and type tests (`npm run typetest`) |
| `samples/` | Todo files to read: a good one and a broken one |
| `examples/` | Small programs on their own: `parseArgs`, defaults, reading JSON from a pipe |
| `mistakes/` | Code with a mistake in it, to see the checks catch it |
| `checks/` | One check program per lesson; each prints `contract: … OK` |
| `try/` | Not committed: the clean folder the packed CLI is installed into |

`npm run contracts` runs every check program. Each one runs the CLI on its
own scratch files, and breaks code only in copies (`.check-*/`), so it
leaves this folder as it found it.

## Lessons

Every command each lesson types is in [LESSONS.md](LESSONS.md), in order. A few
lessons build on the one before:

- the lessons on building and running the built CLI need `dist/` (`npm run build`);
- running the installed CLI needs the tarball installed in `try/`.
