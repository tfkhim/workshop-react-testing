import { RenderResult, cleanup, render } from '@testing-library/react'
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
    const result = givenRenderedComponent()

    expect(result.getByRole('button')).toHaveTextContent('Load')
  })

  it('should initially not show any entry component', () => {
    const result = givenRenderedComponent()

    expect(result.container).toHaveTextContent(/^Load$/)
  })

  it('should show the entries after clicking the button', async () => {
    const result = givenRenderedComponent()
    givenLoadingSucceeds()

    await whenButtonClicked(result)

    expect(result.queryByText(childText)).toBeVisible()
  })

  it('should no longer show the button after clicking it', async () => {
    const result = givenRenderedComponent()
    givenLoadingSucceeds()

    await whenButtonClicked(result)

    expect(result.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should show an error message if loading failed', async () => {
    const result = givenRenderedComponent()
    givenLoadingFails()

    await whenButtonClicked(result)

    expect(result.queryByText('Could not load entries.')).toBeVisible()
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

  const whenButtonClicked = async (result: RenderResult) => {
    const user = userEvent.setup()

    await user.click(result.getByRole('button'))

    return result
  }
})
