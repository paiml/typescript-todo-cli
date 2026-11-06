// Type tests: what the public functions accept and return, checked by tsc.
import { expectTypeOf, test } from "vitest";
import { readArgs } from "./args.ts";
import { addTodo, markDone, type Todo } from "./todos.ts";

test("addTodo returns a new list of todos", () => {
  expectTypeOf(addTodo).returns.toEqualTypeOf<Todo[]>();
});

test("markDone takes the id as a number, and may find no todo", () => {
  expectTypeOf(markDone).parameter(1).toEqualTypeOf<number>();
  expectTypeOf(markDone).returns.toEqualTypeOf<Todo[] | undefined>();
});

test("--file has a default, so it is always a string", () => {
  expectTypeOf(readArgs).returns.toHaveProperty("file").toEqualTypeOf<string>();
});
