// todo clear: removes the todos that are done, then saves the file.
// It has a bug: nothing waits for saveTodos to finish writing.
import { loadTodos } from "../src/load.ts";
import { saveTodos } from "../src/save.ts";

export async function clear(file: string): Promise<number> {
  const todos = await loadTodos(file);
  const open = todos.filter((todo) => !todo.done);
  saveTodos(file, open);
  console.log(`cleared ${todos.length - open.length}`);
  return 0;
}
