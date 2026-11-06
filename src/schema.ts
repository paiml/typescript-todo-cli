// The shape of one todo, and of the file that holds them.
import * as z from "zod";

export const Todo = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  done: z.boolean(),
});

export const TodoFile = z.array(Todo);

export type Todo = z.infer<typeof Todo>;
