// Runs one command and returns its exit code:
// 0 it worked, 1 it failed, 2 the command line was wrong.
import { readArgs, type Args } from "./args.ts";
import { add } from "./commands/add.ts";
import { done } from "./commands/done.ts";
import { list } from "./commands/list.ts";
import { usage } from "./usage.ts";

export async function run(argv: string[]): Promise<number> {
  let args: Args;
  try {
    args = readArgs(argv);
  } catch (error: unknown) {
    const firstSentence = (error as Error).message.split(". ")[0];
    console.error(`todo: ${firstSentence}\ntry: todo --help`);
    return 2;
  }
  if (args.help) {
    console.log(usage);
    return 0;
  }
  try {
    if (args.command === "add") return await add(args);
    if (args.command === "done") return await done(args);
    if (args.command === "list") return await list(args);
  } catch (error: unknown) {
    console.error(`todo: ${(error as Error).message}`);
    return 1;
  }
  console.error(usage);
  return 2;
}
