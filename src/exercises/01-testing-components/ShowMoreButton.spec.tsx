import { RenderResult, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ShowMoreButton } from './ShowMoreButton'

afterEach(cleanup)

describe('ShowMoreButton', () => {
  const childText = 'child-1'

  it('should initially show a button', () => {
    const result = givenRenderedComponent()

    expect(result.getByRole('button')).toHaveTextContent('Show')
  })

  it('should initially not show the child component', () => {
    const result = givenRenderedComponent()

    expect(result.queryByText(childText)).not.toBeInTheDocument()
  })

  it('should show the children after clicking the button', async () => {
    const result = givenRenderedComponent()

    await whenButtonClicked(result)

    expect(result.queryByText(childText)).toBeVisible()
  })

  it('should not longer show the button after clicking it', async () => {
    const result = givenRenderedComponent()

    await whenButtonClicked(result)

    expect(result.queryByRole('button')).not.toBeInTheDocument()
  })

  const givenRenderedComponent = (): RenderResult =>
    render(
      <ShowMoreButton>
        <div>{childText}</div>
      </ShowMoreButton>
    )

  const whenButtonClicked = async (result: RenderResult) => {
    const user = userEvent.setup()

    await user.click(result.getByRole('button'))

    return result
  }
})
