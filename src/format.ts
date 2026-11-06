// How todos are printed: one line each for people, or JSON for programs.
import type { Todo } from "./schema.ts";

export function formatTodo(todo: Todo): string {
  const box = todo.done ? "[x]" : "[ ]";
  return `${box} ${todo.id}. ${todo.title}`;
}

export function formatList(todos: Todo[]): string {
  if (todos.length === 0) {
    return "no todos yet";
  }
  return todos.map(formatTodo).join("\n");
}

export function formatJson(todos: Todo[]): string {
  return JSON.stringify(todos, null, 2);
}
