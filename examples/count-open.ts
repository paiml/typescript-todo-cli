// Reads a todo list as JSON from standard input and counts the open todos.
import { text } from "node:stream/consumers";

const todos: { done: boolean }[] = JSON.parse(await text(process.stdin));
const open = todos.filter((todo) => !todo.done);

console.log(`open: ${open.length} of ${todos.length}`);
