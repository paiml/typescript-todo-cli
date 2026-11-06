// Reads the command line with Node's argument parser.
import { parseArgs } from "node:util";

export function readArgs(args: string[]) {
  const { values, positionals } = parseArgs({
    args,
    options: {
      file: { type: "string", default: "todos.json" },
      json: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
    allowPositionals: true,
  });
  const [command, ...rest] = positionals;
  return { command, rest, ...values };
}

export type Args = ReturnType<typeof readArgs>;
