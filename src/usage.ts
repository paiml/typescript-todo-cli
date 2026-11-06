// What the CLI prints for --help, or when it can't tell what you asked for.
export const usage = `usage: todo <command> [options]

commands:
  add <title>   add a todo
  done <id>     mark a todo done
  list          list the todos

options:
  --file <path> the todo file (default: todos.json)
  --json        print the list as JSON
  --help        print this message`;
