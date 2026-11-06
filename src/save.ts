// Writes the todos back to the file, as JSON a person can read.
import { writeFile } from "node:fs/promises";
import type { Todo } from "./schema.ts";

export async function saveTodos(file: string, todos: Todo[]): Promise<void> {
  const text = JSON.stringify(todos, null, 2);
  await writeFile(file, text + "\n");
}
