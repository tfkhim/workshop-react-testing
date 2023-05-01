import { RenderResult, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ShowMoreButton } from './ShowMoreButton'

afterEach(cleanup)

describe('ShowMoreButton', () => {
  const childText = 'child-1'

  it('should initially show a button', () => {
    givenRenderedComponent()

    expect(screen.getByRole('button')).toHaveTextContent('Show')
  })

  it('should initially not show the child component', () => {
    givenRenderedComponent()

    expect(screen.queryByText(childText)).not.toBeInTheDocument()
  })

  it('should show the children after clicking the button', async () => {
    givenRenderedComponent()

    await whenButtonClicked()

    expect(screen.queryByText(childText)).toBeVisible()
  })

  it('should not longer show the button after clicking it', async () => {
    givenRenderedComponent()

    await whenButtonClicked()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  const givenRenderedComponent = (): RenderResult =>
    render(
      <ShowMoreButton>
        <div>{childText}</div>
      </ShowMoreButton>
    )

  const whenButtonClicked = async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button'))
  }
})
