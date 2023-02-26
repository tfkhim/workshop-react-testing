import { FC, PropsWithChildren, useEffect, useState } from 'react'
import {
  cleanup,
  render,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

afterEach(() => {
  // Remove any created DOM nodes to start each test case
  // with a clean document. The call to cleanup here is
  // actually not needed, because there is already a call
  // to this method in testSetup.ts.
  cleanup()
})

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
  // waits for the element to appear in the DOM. The waiting
  // timeout and polling interval are configurable. The default
  // to 1000 ms for the timeout and 50 ms for the polling interval.
  // The same can be achieved using the waitFor method.
  test('Find elements', async () => {
    const textContent = 'text content'

    const { getByText, findByText } = render(
      <ShowChildrenAfterSomeTime>{textContent}</ShowChildrenAfterSomeTime>
    )

    expect(() => getByText(textContent)).toThrowError()

    expect(
      await findByText(textContent, undefined, { timeout: 60, interval: 50 })
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

describe('Interaction', () => {
  test('Click a button', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const { getByRole } = render(<button onClick={onClick} />)

    await user.click(getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  test('Insert text', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(
      <form>
        <input id="input" type="text" />
        <label htmlFor="input">Input</label>
      </form>
    )

    const input = getByLabelText('Input')
    await user.type(input, 'Hello')

    expect(input).toHaveDisplayValue('Hello')
  })
})

describe('Advanced', () => {
  // The waitFor method allows you to specify more powerful
  // conditions than what the findBy* family provides. Most
  // of the time awaiting a findBy* query and performing the
  // assertions afterwards works, too. But it might be useful
  // if you have to wait for some asynchronous action that
  // doesn't change the DOM, e.g. a mutation call to some
  // backend API.
  test('Wait for some assertion to become true', async () => {
    const DelayedCallbackInvocation: FC<{ callback: () => void }> = ({
      callback,
    }) => {
      useEffect(() => {
        const id = setTimeout(callback, 10)
        return () => clearTimeout(id)
      }, [callback])
      return null
    }

    const callback = vi.fn()

    render(<DelayedCallbackInvocation callback={callback} />)

    await waitFor(() => {
      expect(callback).toHaveBeenCalledOnce()
    })
  })

  // Wait for an element to disappear. The callback must return an
  // element, list of elements or null. It may also throw an
  // exception if the element is not present. So you can use the
  // getBy*, queryBy*, getAllBy* and queryAllByÜ function families.
  // The waitForElementToBeRemoved method will throw an error if the
  // element is already removed during the initial execution of the
  // callback.
  test('Wait for some element to disappear', async () => {
    const textContent = 'Hello World!'
    const { queryByText } = render(
      <HideChildrenAfterSomeTime>{textContent}</HideChildrenAfterSomeTime>
    )

    expect(queryByText(textContent)).toBeInTheDocument()

    await waitForElementToBeRemoved(() => queryByText(textContent))

    expect(queryByText(textContent)).not.toBeInTheDocument()
  })

  // The within function allows you to get a new set of getBy*,
  // queryBy*, ... functions that are bound to some sub element.
  test('Query within a sub element', () => {
    const { getByText } = render(
      <div>
        <div>
          First <button>Button 1</button>
        </div>
        <div>
          Second <button>Button 2</button>
        </div>
      </div>
    )

    const firstDiv = getByText(/First/)

    const firstButton = within(firstDiv).getByRole('button')

    expect(firstButton).toHaveTextContent('Button 1')
  })
})

// ---------------------------------------------------------
// Test component to demonstrate async methods
// ---------------------------------------------------------

const ShowChildrenAfterSomeTime: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ShowOrHideAfterSomeTime initiallyShown={false}>
      {children}
    </ShowOrHideAfterSomeTime>
  )
}

const HideChildrenAfterSomeTime: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ShowOrHideAfterSomeTime initiallyShown={true}>
      {children}
    </ShowOrHideAfterSomeTime>
  )
}

const ShowOrHideAfterSomeTime: FC<
  PropsWithChildren<{ initiallyShown: boolean }>
> = ({ children, initiallyShown }) => {
  const [show, setShow] = useState(initiallyShown)

  useEffect(() => {
    const id = setTimeout(() => setShow((show) => !show), 10)
    return () => clearTimeout(id)
  }, [])

  return show ? <>{children}</> : null
}
