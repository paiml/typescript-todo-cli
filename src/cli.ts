#!/usr/bin/env node
// The todo command: runs what the command line asks for, then exits with its code.
import { run } from "./run.ts";

process.exitCode = await run(process.argv.slice(2));
