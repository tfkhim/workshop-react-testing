This project contains slides and exercises for a company internal workshop.

# Notes for Participants

You will need to run some test cases as part of the exercises. The project
uses [Vitest](https://vitest.dev/) as a test framework.

First, install the project dependencies

    npm ci

Then you can run all test cases with the following command

    npm run test

You can run a specific test file by passing it as a positional argument

    npm run test -- <path_to_spec_tsx>

It is also possible to start the test runner in watch mode

    npm run test:watch

The test runner will then re-run the test cases if a source or test files
changes.

# Slides

The slides use [reveal.js](https://revealjs.com/) and are hosted at the projects
[GitHub page](https://tfkhim.github.io/workshop-react-testing/).

## Local Development

The project uses [Vite](https://vitejs.dev/) as a development server.
You can start it with the following command

    npm start

The slides can then be accessed at http://localhost:5173/slides/. The dev server
will pick up any changes to the `slides/index.hml` and `slides/index.js`.
