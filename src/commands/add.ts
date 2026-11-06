// todo add <title>: adds a todo and saves the file.
import type { Args } from "../args.ts";
import { loadTodos } from "../load.ts";
import { saveTodos } from "../save.ts";
import { addTodo, nextId } from "../todos.ts";

export async function add(args: Args): Promise<number> {
  const title = args.rest.join(" ");
  if (title === "") {
    console.error("todo: add needs a title");
    return 2;
  }
  const todos = await loadTodos(args.file);
  const id = nextId(todos);
  await saveTodos(args.file, addTodo(todos, title));
  console.log(`added ${id}: ${title}`);
  return 0;
}
