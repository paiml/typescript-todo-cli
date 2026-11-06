// The changes the CLI makes to a list of todos. Each one returns a new list.
import type { Todo } from "./schema.ts";

export type { Todo };

export function nextId(todos: Todo[]): number {
  return Math.max(0, ...todos.map((todo) => todo.id)) + 1;
}

export function addTodo(todos: Todo[], title: string): Todo[] {
  return [...todos, { id: nextId(todos), title, done: false }];
}

export function markDone(todos: Todo[], id: number): Todo[] | undefined {
  if (!todos.some((todo) => todo.id === id)) {
    return undefined; // no todo has this id
  }
  return todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo));
}
