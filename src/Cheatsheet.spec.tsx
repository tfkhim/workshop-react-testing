import { FC, useEffect, useState } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Different query types', () => {
  // The get* family of functions returns a HTMLElement instance if it
  // exists or throws an error otherwise.
  test('Get elements', () => {
    const { getByText } = render(<h1>text content</h1>)

    expect(getByText('text content')).instanceOf(HTMLElement)
    expect(() => getByText('not existing text content')).toThrowError(
      'Unable to find an element with the text: not existing text content.'
    )
  })

  // The query* family of functions returns a HTMLElement instance if it
  // exists or null otherwise.
  test('Query elements', () => {
    const { queryByText } = render(<h1>text content</h1>)

    expect(queryByText('text content')).instanceOf(HTMLElement)

    const notExistingElement = queryByText('not existing text content')
    expect(notExistingElement).toStrictEqual(null)

    // You can also use not.toBeInTheDocument() to make this more
    // readable.
    expect(notExistingElement).not.toBeInTheDocument()
  })

  // The find* family of functions works like the get* family but
  // waits for the element to appear in the DOM. The the timeout
  // for waiting is configurable. The same can be achieved using
  // the waitFor method.
  test('Find elements', async () => {
    const textContent = 'text content'

    const TestComponent: FC = () => {
      const [show, setShow] = useState(false)

      useEffect(() => {
        const id = setTimeout(() => setShow(true), 10)
        return () => clearTimeout(id)
      })

      return show ? <h1>{textContent}</h1> : null
    }

    const { getByText, findByText } = render(<TestComponent />)

    expect(() => getByText(textContent)).toThrowError()

    expect(
      await findByText(textContent, undefined, { timeout: 50 })
    ).instanceOf(HTMLElement)
  })
})
