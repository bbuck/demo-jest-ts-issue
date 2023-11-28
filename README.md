# Description

This repository demonstrates a module not found issue running Jest (ts-jest) in
a pnpm monorepo (pnpm may or may not be a factor). The issue is this:

```
 FAIL  src/calculator.spec.ts
  ● Test suite failed to run

    Cannot find module '@scope/foo' from 'src/calculator.ts'

    Require stack:
      src/calculator.ts
      src/calculator.spec.ts

    > 1 | import { add } from "@scope/foo";
        | ^
      2 |
      3 | type Operation = "add" | "subtract" | "divide" | "multiply";
      4 |

      at Resolver._throwModNotFoundError (../../node_modules/.pnpm/jest-resolve@29.7.0/node_modules/jest-resolve/build/resolver.js:427:11)
      at Object.<anonymous> (src/calculator.ts:1:1)
      at Object.<anonymous> (src/calculator.spec.ts:1:1)
```

When running Jest it's unable to resolve the path to the package.

# Pulling and Testing

This repo features two branches, `main` is a branch where the tests succeed and
execution of the packages work correctly. While `demo` is a branch where the
the tests fail but execution works correctly.

```diff
diff --git a/packages/bar/package.json b/packages/bar/package.json
index fbf114a..2738c7b 100644
--- a/packages/bar/package.json
+++ b/packages/bar/package.json
@@ -4,7 +4,7 @@
   "version": "1.0.0",
   "description": "",
   "type": "module",
-  "main": "main.ts",
+  "main": "main.js",
   "scripts": {
     "test": "jest",
     "start": "ts-node --esm main.ts 10 20"
diff --git a/packages/foo/package.json b/packages/foo/package.json
index e364220..0cbe1d0 100644
--- a/packages/foo/package.json
+++ b/packages/foo/package.json
@@ -4,7 +4,7 @@
   "version": "1.0.0",
   "description": "",
   "type": "module",
-  "main": "main.ts",
+  "main": "main.js",
   "scripts": {
     "test": "jest",
     "start": "ts-node --esm main.ts"
```

The key difference in `demo` from `main` feature above is that the `"main"` field of
`packages/foo/package.json` and `packages/bar/package.json` point to the future
compiled JS file location which doesn't effect execution but breaks Jest ability
to resolve the resolve the module.

## Hands On

You will need to have `pnpm` installed.

1. Pull the repo
1. Run `pnpm install`
1. cd into `packages/foo` and run `pnpm test` (it should succeed)
1. run `pnpm start` (it should do nothing, no error, no issue as `main.ts` here
   just exports).
1. cd into `packages/bar` (from the git root)
1. Run `pnpm test` (it should succeed)
1. Run `pnpm start` (it should succeed and print a math problem)
1. Checkout the `demo` branch (which flips the "main" entry in package.json
   files to point to the JS target instead of the TS source file)
1. cd into `packages/foo` from the git root
1. Run `pnpm test` (it should succeed)
1. Run `pnpm start` (it should succeed, again nothing should print as it's just
   exporting)
1. cd into `packages/bar` from the git root
1. Run `pnpm test` (it should fail with a module not found, complaining about
   `@scope/foo`)
1. Run `pnpm start` (it should succeed, again printing a math problem)
