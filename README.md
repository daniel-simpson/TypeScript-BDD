# BDD-TypeScript

Web frontend BDD-style testing written in Typescript ❤

## Background

This project uses [Cucumber-js](https://github.com/cucumber/cucumber-js) to allow BDD tests written in Gherkin format to be executed, with the underlying browser automation tool handled by [TestCafe](https://devexpress.github.io/testcafe/).

## Project Setup

- `src/types/` - Custom type definitions for this project
- `src/utils/` - Any non-test-specific reusable logic.
- `src/steps_definitions/` - Contains all custom cucumber step definitions
- `src/environment.ts` - Contains all variables that will available to the test run, including initialisation from environment variables.
- `features/` - Contains all `*.feature` files that contain the tests to be run
- `reports/` - A mostly-gitignored folder for outputting json reports at the end of a test run.

## Using this repository

- Run `npm install` (or `yarn`) to install devDependencies.
- (Optional) If using VS Code, install [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) to get gherkin syntax autocomplete
- Add a `.env` file with _at least_ the BASE_URL (no trailing slash) set
- Run `npm run dev` to run a "hot-reload" style test service, which will automatically run any tests tagged with `@dev` whenever you make changes and save
- Run `npm test` or `yarn test` to run all tests
- Use `npm run test:ci` when doing a CI test, this will use a headless version of chrome, and show test output in console and log to reports/ci.trx. TRX file is Azure DevOps native, so you can push it into its test reporting suite of tools!
- `npm run test:local` will test a local version of your site at localhost:3000

Note: have a read of package.json's scripts section for other versions of the above

Note: to test a different environment other than production, set the environment variable `BASE_URL`. You can see an example of this using cross-env in the `test:local` package json script.

### Debugging failing tests

I've added one new (PowerShell) script recently to be able to assist devs with identifying and debugging failing tests:

- Run `npm run test:ci`
- I wait like, 12 minutes and see which (if any) tests fail
- Run `& ./azure-pipelines/Tag-FailingTests.ps1` to analyse the recently generated report at `reports/ci.json` and tag all failing test fixtures
- Run `npm run dev` to start a livereload server that targets only the failing tests above
- Fix the breaking tests (or code, I guess)
- Commit your fixes (but not the `@dev` tags please!)
