// The build: the CLI and the public functions, as JavaScript plus type declarations.
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/cli.ts", "src/todos.ts"],
  dts: true,
});
