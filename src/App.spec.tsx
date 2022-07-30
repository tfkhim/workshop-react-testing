import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('should greet the world', () => {
    const result = render(<App />)

    expect(result.getByRole('heading')).toHaveTextContent('Hello World!')
  })
})
