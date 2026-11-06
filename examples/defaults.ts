// An option with a default always has a value, and its type says so.
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    file: { type: "string", default: "todos.json" },
    json: { type: "boolean", default: false },
    owner: { type: "string" },
  },
});

const file: string = values.file;
const json: boolean = values.json;
const owner: string = values.owner;

console.log({ file, json, owner });
