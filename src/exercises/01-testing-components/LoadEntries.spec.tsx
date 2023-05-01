import { RenderResult, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { LoadEntries } from './LoadEntries'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('LoadEntries', () => {
  const childText = 'child-1'

  it('should initially show a button', () => {
    givenRenderedComponent()

    expect(screen.getByRole('button')).toHaveTextContent('Load')
  })

  it('should initially not show any entry component', () => {
    const { container } = givenRenderedComponent()

    expect(container).toHaveTextContent(/^Load$/)
  })

  it('should show the entries after clicking the button', async () => {
    givenRenderedComponent()
    givenLoadingSucceeds()

    await whenButtonClicked()

    expect(screen.queryByText(childText)).toBeVisible()
  })

  it('should no longer show the button after clicking it', async () => {
    givenRenderedComponent()
    givenLoadingSucceeds()

    await whenButtonClicked()

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should show an error message if loading failed', async () => {
    givenRenderedComponent()
    givenLoadingFails()

    await whenButtonClicked()

    expect(screen.queryByText('Could not load entries.')).toBeVisible()
  })

  const givenRenderedComponent = (): RenderResult => render(<LoadEntries />)

  const givenLoadingSucceeds = (): void => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    const response = {
      json(): Promise<string[]> {
        return Promise.resolve([childText])
      },
    } as unknown as Response
    fetchSpy.mockResolvedValueOnce(response)
  }

  const givenLoadingFails = (): void => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    fetchSpy.mockRejectedValueOnce(new Error('MOCK'))
  }

  const whenButtonClicked = async () => {
    const user = userEvent.setup()
    await user.click(screen.getByRole('button'))
  }
})
