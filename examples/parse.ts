// Prints what Node's argument parser makes of the command line.
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  options: {
    file: { type: "string" },
    json: { type: "boolean" },
  },
  allowPositionals: true,
});

console.log("values:     ", JSON.stringify(values));
console.log("positionals:", JSON.stringify(positionals));
