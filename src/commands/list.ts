// todo list: prints the todos, as text or with --json as JSON.
import type { Args } from "../args.ts";
import { formatJson, formatList } from "../format.ts";
import { loadTodos } from "../load.ts";

export async function list(args: Args): Promise<number> {
  const todos = await loadTodos(args.file);
  console.log(args.json ? formatJson(todos) : formatList(todos));
  return 0;
}
