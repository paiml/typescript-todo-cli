# todo: the brief

A todo list for the command line, run as `todo <command>`.

1. `todo add <title>` adds a todo and prints its id.
2. `todo done <id>` marks that todo done.
3. `todo list` prints every todo, one per line.
4. `todo list --json` prints them as JSON, for other programs.
5. `--file <path>` picks the todo file (default: todos.json).
6. A missing file means no todos yet.
7. A file that is not a todo list is an error, not a crash.
8. Errors go to standard error, never to standard output.
9. Exit codes: 0 it worked, 1 it failed, 2 the command line was wrong.
