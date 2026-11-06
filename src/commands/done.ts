// todo done <id>: marks one todo done and saves the file.
import type { Args } from "../args.ts";
import { loadTodos } from "../load.ts";
import { saveTodos } from "../save.ts";
import { markDone } from "../todos.ts";

export async function done(args: Args): Promise<number> {
  const id = args.rest[0];
  if (id === undefined) {
    console.error("todo: done needs an id");
    return 2;
  }
  const todos = markDone(await loadTodos(args.file), Number(id));
  if (todos === undefined) {
    console.error(`todo: no todo with id ${id}`);
    return 1;
  }
  await saveTodos(args.file, todos);
  console.log(`done: ${id}`);
  return 0;
}
