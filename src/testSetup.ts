import { expect } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

// We use the fetch browser API. This API isn't provided
// by the jsdom environment. Therefore we have to add a
// polyfill for it.
import 'whatwg-fetch'

expect.extend(matchers)
