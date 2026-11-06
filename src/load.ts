// Reads the todo file and checks it with Zod.
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import * as z from "zod";
import { TodoFile, type Todo } from "./schema.ts";

export async function loadTodos(file: string): Promise<Todo[]> {
  if (!existsSync(file)) {
    return []; // no file yet means no todos yet
  }
  const text = await readFile(file, "utf8");
  const result = TodoFile.safeParse(JSON.parse(text));
  if (!result.success) {
    const problems = z.prettifyError(result.error);
    throw new Error(`${file} is not a todo file\n${problems}`);
  }
  return result.data;
}
