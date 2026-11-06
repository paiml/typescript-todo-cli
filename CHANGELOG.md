# Changelog

Every version of ts7-todo, newest first. The version is the one in
package.json, and in the tarball's name.

## 0.1.0

- `todo add <title>`, `todo done <id>` and `todo list`, on one JSON file
  (`--file`, default `todos.json`).
- `todo list --json` prints the list as JSON, for other programs.
- Errors go to standard error. Exit codes: 0 it worked, 1 it failed, 2 the
  command line was wrong.
