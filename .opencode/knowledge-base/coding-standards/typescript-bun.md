# TypeScript + Bun — Project Conventions

This project uses TypeScript and Bun. The following conventions and rules should be followed by all contributors to keep the codebase consistent and enable reliable local/CI tooling.

**Language & Runtime**

- The project is written in TypeScript and built/run using Bun. Use Bun for running scripts, tests, and dev tasks.

**Formatting & Linting**

- Follow the repository's ESLint, Prettier and `tsconfig.json` rules. These are the source of truth for formatting, style, and TypeScript compiler options.
- Run the linters/formatters via the npm scripts that call Bun (e.g., `bun run lint`, `bun run format`) or via the configured CI workflows.

**Running Code & Scripts**

- Use Bun to run all project commands locally (e.g., `bun run dev`, `bun run start`, `bun test`). Avoid invoking node/npm directly unless strictly necessary.

**Tests**

- Tests are run with Bun's test runner. Use `bun test` or the project `bun` test script.
- Tests should be collocated with the code they exercise (same directory as the module under test). Keep test file names consistent (e.g., `foo.test.ts` or `foo.spec.ts`).

**Module Structure**

- We prefer simple, focused modules: aim for one exported function per module when it makes sense. Small modules are easier to test, reason about, and re-use.
- Use barrel modules (`index.ts`) to re-export related functionality for convenient public imports. Keep barrel files minimal and avoid circular imports.

**TypeScript Practices**

- Keep `tsconfig.json` rules in sync with project conventions. Use explicit types for public APIs and prefer narrow types for function inputs/outputs.
- Keep side effects out of module top-level code where possible to improve testability.

**Other Notes**

- If you add or change ESLint/Prettier/tsconfig rules, document the rationale in the PR and update this knowledge-base article if the change affects contributor workflows.

Following these conventions keeps the codebase consistent and makes local development, testing, and CI reliable when using Bun and TypeScript.
