# The commands from each lesson

Every command typed in the lesson videos, in order. Run them from the root of
this repository, after the setup in README.md.

## 1.1.2 The starter repository

```bash
ls
npm pkg get dependencies devDependencies
npm ci
ls src src/commands
node checks/starter.ts
```

## 1.1.3 The contract it must pass

```bash
cat BRIEF.md
node checks/brief.ts
```

## 1.2.1 Options and positional arguments with Node's argument parser

```bash
cat examples/parse.ts
node examples/parse.ts add buy milk --file work.json
node examples/parse.ts list --json
node checks/parse-args.ts
```

## 1.2.2 Typed values and defaults

```bash
cat examples/defaults.ts
npx tsc -p examples
node examples/defaults.ts
node checks/defaults.ts
```

## 1.2.3 A usage message

```bash
cat src/usage.ts
node src/cli.ts --help
node src/cli.ts list --colour
node checks/usage.ts
```

## 1.3.1 Adding, completing and listing todos

```bash
node src/cli.ts add buy milk
node src/cli.ts add walk the dog
node src/cli.ts done 1
node src/cli.ts list
node checks/commands.ts
```

## 1.3.2 Errors go to standard error

```bash
node src/cli.ts done 99
node src/cli.ts done 99 > out.txt
wc -c out.txt
grep -n console src/run.ts
node checks/stderr.ts
```

## 1.3.3 Exit codes scripts can rely on

```bash
node src/cli.ts list
echo $?
node src/cli.ts done 99
echo $?
node src/cli.ts
echo $?
grep -n return src/run.ts
node checks/exit-codes.ts
```

## 2.1.1 Loading the file

```bash
cat samples/todos.json
cat src/load.ts
node src/cli.ts list --file samples/todos.json
node checks/load.ts
```

## 2.1.2 Validating with Zod

```bash
cat src/schema.ts
cat samples/broken.json
node src/cli.ts list --file samples/broken.json
node checks/zod.ts
```

## 2.1.3 A missing file means no todos yet

```bash
ls todos.json
node src/cli.ts list
node src/cli.ts list --json
grep -n -A2 existsSync src/load.ts
node checks/missing-file.ts
```

## 2.2.1 Writing the todo file

```bash
cat src/save.ts
node src/cli.ts add buy milk
cat todos.json
node checks/save.ts
```

## 2.2.2 Adding a todo

```bash
cat src/commands/add.ts
head -n 12 src/todos.ts
cp samples/todos.json todos.json
node src/cli.ts add book the dentist
node src/cli.ts add
node checks/add.ts
```

## 2.2.3 Marking one done

```bash
cp samples/todos.json todos.json
tail -n 7 src/todos.ts
node src/cli.ts done 2
node src/cli.ts list
node checks/done.ts
```

## 2.3.1 Plain text output

```bash
cat src/format.ts
node src/cli.ts list --file samples/todos.json
node checks/text-output.ts
```

## 2.3.2 JSON output

```bash
node src/cli.ts list --file samples/todos.json --json
cat examples/count-open.ts
node src/cli.ts list --file samples/todos.json --json | node examples/count-open.ts
node checks/json-output.ts
```

## 2.3.3 Unknown ids and friendly errors

```bash
node src/cli.ts done 4 --file samples/todos.json
node src/cli.ts done --file samples/todos.json
grep -n console.error src/commands/done.ts
node checks/friendly-errors.ts
```

## 3.1.1 Unit tests with Node's test runner

```bash
cat src/todos.test.ts
node --test src/todos.test.ts
node checks/unit-tests.ts
```

## 3.1.2 Spawning the CLI from a test

```bash
head -n 14 src/cli.test.ts
tail -n 16 src/cli.test.ts
node --test src/cli.test.ts
node checks/spawn-tests.ts
```

## 3.1.3 Coverage

```bash
npm test
node --test --experimental-test-coverage 'src/*.test.ts'
node checks/coverage.ts
```

## 3.2.1 Type tests for the public functions

```bash
cat src/todos.test-d.ts
npx vitest run --typecheck.only
node checks/type-tests.ts
```

## 3.2.2 Type-aware linting with Oxlint

```bash
cat mistakes/clear.ts
npx tsc -p mistakes
npx oxlint mistakes/clear.ts
npx oxlint --type-aware mistakes/clear.ts
node checks/lint.ts
```

## 3.2.3 Checking formatting with Prettier

```bash
npx prettier --check src
cat mistakes/format.ts
npx prettier --check mistakes/format.ts
npx prettier mistakes/format.ts
node checks/format.ts
```

## 3.3.1 An npm script that runs everything

```bash
npm pkg get scripts
npm run check
node checks/check-script.ts
```

## 3.3.2 Breaking it on purpose

```bash
cp mistakes/format.ts src/format.ts
npm run check
echo $?
node checks/broken.ts
```

## 3.3.3 Fixing it

```bash
cp mistakes/format.ts src/format.ts
npm run format
npx prettier --write src
npm run check
node checks/fixed.ts
```

## 4.1.1 Building with tsdown and type declarations

```bash
cat tsdown.config.ts
npm run build
ls dist
cat dist/todos.d.mts
node checks/build.ts
```

## 4.1.2 Making the package runnable as a command

```bash
npm pkg get bin
head -n 2 dist/cli.mjs
ls -l dist/cli.mjs
./dist/cli.mjs list --file samples/todos.json
node checks/bin.ts
```

## 4.1.3 What goes into the package

```bash
npm pkg get files
npm pack --dry-run
node checks/package-files.ts
```

## 4.2.1 Packing the package with npm

```bash
npm pack
ls *.tgz
tar -tzf ts7-todo-0.1.0.tgz
node checks/pack.ts
```

## 4.2.2 Installing the tarball in a clean folder

```bash
mkdir try
cp ts7-todo-0.1.0.tgz try/
cd try
npm init -y
npm install ./ts7-todo-0.1.0.tgz
ls node_modules node_modules/.bin
cd ..
node checks/install.ts
```

## 4.2.3 Running the installed CLI

```bash
cd try
npx todo add buy milk
npx todo list
npx todo done 99
ls
cd ..
node checks/installed.ts
```

## 4.3.1 Rehearsing a publish with npm

```bash
npm pkg get name version
npm publish --dry-run
node checks/publish.ts
```
