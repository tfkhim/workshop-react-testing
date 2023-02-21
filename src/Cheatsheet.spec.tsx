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

// The order of the following test cases reflect the priority given
// by Testing Library:
// https://testing-library.com/docs/queries/about#priority
describe('Different query selectors', () => {
  // Getting an element by an accessibility role is the prefered
  // selector.
  test('By element role', () => {
    const { getByRole } = render(<button>Press me</button>)

    const button = getByRole('button')

    expect(button).toHaveTextContent('Press me')
  })

  // You can use the name option to select only elements
  // having the desired accessible name. This is especially
  // useful if there are multiple elements with the same
  // role.
  test('By element role and accessible name', () => {
    const { getByRole } = render(
      <>
        <button>Okay</button>
        <button>Cancel</button>
      </>
    )

    const button = getByRole('button', { name: 'Cancel' })

    expect(button).toHaveTextContent('Cancel')
  })

  // The *ByLabelText selectors will return the input
  // element the label is refering to.
  test('By label text', () => {
    const { getByLabelText } = render(
      <form>
        <input id="name" type="text" value="Jon Doe" readOnly />
        <label htmlFor="name">Your name</label>
      </form>
    )

    const input = getByLabelText('Your name')

    expect(input).toHaveDisplayValue('Jon Doe')
  })

  test('By placeholder text', () => {
    const { getByPlaceholderText } = render(
      <form>
        <input
          type="text"
          placeholder="Enter your name"
          value="Jon Doe"
          readOnly
        />
      </form>
    )

    const input = getByPlaceholderText('Enter your name')

    expect(input).toHaveDisplayValue('Jon Doe')
  })

  test('By text', () => {
    const { queryByText } = render(<span>Text content</span>)

    const span = queryByText('Text content')

    expect(span).toBeVisible()
  })

  test('By display value', () => {
    const { getByDisplayValue } = render(
      <input value="display value" readOnly />
    )

    const input = getByDisplayValue('display value')

    expect(input).toBeValid()
  })

  // The different browsers provide a different user
  // experience w.r.t. the alternative text. Therefore
  // this selector should only be used if you can not
  // achive the same thing with one of the selectors
  // above.
  test('By alt text', () => {
    const { getByAltText } = render(<img alt="an image" src="image url" />)

    const img = getByAltText('an image')

    expect(img).toBeVisible()
  })

  // The different browsers provide a different user
  // experience w.r.t. the title text. Therefore this
  // selector should only be used if you can not achive
  // the same thing with one of the selectors above.
  test('By title text', () => {
    const { getByTitle } = render(<img title="an image" src="image url" />)

    const img = getByTitle('an image')

    expect(img).toBeVisible()
  })

  // Querying by test ID should only be a last resort.
  // In 99% of the cases the you do not need to use this
  // selector.
  test('By test id', () => {
    const { getByTestId } = render(
      <div data-testid="div element" style={{ color: 'red' }} />
    )

    const div = getByTestId('div element')

    expect(div).toHaveStyle({ color: 'red' })
  })
})
