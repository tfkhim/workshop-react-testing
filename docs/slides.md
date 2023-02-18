class: middle, center

# React Testing

.footnote[Project source: https://github.com/tfkhim/workshop-react-testing]

---

# Agenda

- Introduction to web frontend testing
- Warmup exercise
- React Testing Library
- Exercise
- Tips & Tricks to improve testability

???

- Introduction
  - Motivation
  - Goals
  - Test environments
  - Test frameworks
- Warmup exercise
  - Miro
- React Testing Library
  - Show you how you can test React in a unit test fashion
  - Then you can get some hands on experience for writing such tests
  - Exchange experience from the exercise and think about what makes testing hard
- Tips & Tricks
  - Show you some approaches, techniques and their disadvantages
  - Another hands on experience
  - Some discussion (because as with everything in software development: it always depends)

---

class: middle, center

# Motivation

Why a workshop about testing?

???

- An important part of software development is about minimizing the costs of changes
- Helps to come up with a good software design
  - Testing gets more difficult if good design principles are violated
  - Single-Responsibility-Principle: Violation normally means a change results
    in changes to many tests cases
  - Interface-Segregation-Prinziple: Violation makes mocking hard due to the
    amount of methods interfaces have
  - Inversion of control and dependency injection: Violation makes mocking
    hard or impossible
- You get an early look at the client side
  - How readable is the calling site
  - Ergonomic API
- Manual testing is expensive and boring
  - Boring tasks diminish motivation
  - Boring tasks lead to errors
- It gives us confidence that our changes do no harm
- Bringing together people from different teams
  - Each team faced different problems over time
  - And might have develop their own approaches to solve them
  - Exchanging them might result in an even better solution for them

---

class: middle, center

# Decissions

1. Test environment
2. Test framework

???

What do we need for testing React applications?

---

class: middle, center

# Real Browser

Remote control a browser

???

Different protocols:

- WebDriver (Selenium)
- TestCafe
- DevTools Protocol (Playwright)
- Browserstack for cross browser and OS tests

---

class: middle, center

# Fake Environment

Node.js runtime with jsdom or happy-dom

???

- Node.js doesn't support browser API's like DOM
- Your code will run in a browser and therefore has to use browser API's and no Node.js API's
- Those fake environments bring the browser API's to Node.js

---

class: middle, center

# Test Framework

For a fake environment most Node.js test frameworks can be used. For example Jest, Mocha or Vitest.
Combine them with [React Testing Library](https://testing-library.com/) to simplify writing tests.

For testing with a real browser there are also plenty of options.
[TestCafe](https://testcafe.io/) or [Playwright](https://playwright.dev/) are two popular choices.

???

Pros and Cons

- A fake environment is more lightweight (memory and performance wise) than starting a browser
- It is easier to mock external dependencies within a fake environment
- Generating coverage reports is much easier in fake environments
- Debugging a test is much easier with a fake environment
- Accidental use of Node.js API is possible in fake environments
- You might have to provide your own polyfills for API's not supported by jsdom or happy-dom
- A real browser gives you much more confidence that your code is correct
- A real browser allows you to take screenshots and see what is going on

---

class: middle, center

# Warmup

Think of different kinds of tests for a web based frontend application.

Which kind of environment would you use for that kind of test?

???

Timebox: 10 Minutes

- 2 Minutes collecting
- 8 Minutes presentation and discussion

When to use what?

- A fake environment works good for tests that focus on complex logic with limited browser API interaction
- Testing any kind of visual appearance or layout makes only sense in a real browser
- Obviously use a real browser if you want to make sure your code is compatible to a specific browser
- Integration test of multiple frontend components or of the frontend with the backend: Both environment
  types may work for you. HTTP calls are covered by jsdom or happy-dom.
- Performance tests should most likely be done in a real browser

---

class: middle, center

# React Testing Library

---

class: middle

# Vitest setup

**package.json**

```json
  "devDependencies": {
    "@testing-library/react": "13.4.0",
    "jsdom": "21.0.0"
  }
```

**vite.config.ts**

```typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
*   environment: 'jsdom'
  },
})
```

---

# Usage

**Render components**

```tsx
import { render } from '@testing-library/react'

const onClick = () => {}
const title = 'Press me'
const { getByRole, queryByRole, findByRole } = render(
  <button onClick={onClick}>{title}</button>
)
```

**Querying the DOM**

```tsx
import { screen } from '@testing-library/react'

const button = screen.getByRole('button')
const heading = screen.queryByRole('heading')
const awaitedButton = await screen.findByRole('button')
```

---

# Assertions

**package.json**

```json
  "devDependencies": {
    "@testing-library/jest-dom": "5.16.5"
  }
```

**vite.config.ts**

```typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
*   setupFiles: ['./src/testSetup.ts'],
  },
})
```

---

class: middle

**testSetup.ts**

```typescript
import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
```

**\*.spec.tsx**

```tsx
const element = screen.getByText('Hello World!')

expect(element).toHaveTextContent('Hello World!')
expect(element).toBeVisible()
expect(element).toBeEnabled()
expect(element).toHaveFocus()

await waitFor(() => {
  expect(screen.getByText('Hello World!')).toBeVisible()
})
```

---

# Interaction

**package.json**

```json
  "devDependencies": {
    "@testing-library/user-event": "14.4.3"
  }
```

**\*.spec.tsx**

```tsx
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

render(<button>Button</button>)

user.click(screen.getByRole('button'))
```

---

class: middle, center

# Cheatsheet

**src/Cheatsheet.spec.tsx**

---

# Ideas for future workshops

- Integration tests with Playwright
- Component tests with Playwright
- Visual appearance tests

Vote on Miro if you are interested.
