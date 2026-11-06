// Unit tests for the functions that change the list: no files, no CLI.
import assert from "node:assert/strict";
import { test } from "node:test";
import { addTodo, markDone } from "./todos.ts";

const two = addTodo(addTodo([], "buy milk"), "walk the dog");

test("addTodo gives each new todo the next id", () => {
  assert.deepEqual(two[1], { id: 2, title: "walk the dog", done: false });
});

test("markDone marks only that todo", () => {
  const done = markDone(two, 2)?.map((todo) => todo.done);
  assert.deepEqual(done, [false, true]);
});

test("markDone returns undefined for an unknown id", () => {
  assert.equal(markDone(two, 99), undefined);
});
