import { RenderResult, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('Plain tests', () => {
  it('should have a heading telling users what it is good for', () => {
    const { queryByText } = render(<App />)

    expect(queryByText('Counting things')).toBeVisible()
  })

  it('should have an initial count of zero', () => {
    const { getByLabelText } = render(<App />)

    expect(getByLabelText('count')).toHaveTextContent('0')
  })

  it('should allow incrementing the counter', async () => {
    const user = userEvent.setup()

    const { getByText, getByLabelText } = render(<App />)

    const incrementButton = getByText('+')
    await user.click(incrementButton)

    expect(getByLabelText('count')).toHaveTextContent('1')
  })

  it('should not allow decrementing below zero', async () => {
    const user = userEvent.setup()

    const { getByText, getByLabelText } = render(<App />)

    const decrementButton = getByText('-')
    await user.click(decrementButton)

    expect(getByLabelText('count')).toHaveTextContent('0')
  })

  it('should allow decrementing a positive value', async () => {
    const user = userEvent.setup()

    const { getByText, getByLabelText } = render(<App />)

    const incrementButton = getByText('+')
    await user.click(incrementButton)

    const decrementButton = getByText('-')
    await user.click(decrementButton)

    expect(getByLabelText('count')).toHaveTextContent('0')
  })
})

describe('With Page Model', () => {
  it('should have a heading telling users what it is good for', () => {
    const app = AppModel.create()

    expect(app.queryHeading()).toBeVisible()
  })

  it('should have an initial count of zero', () => {
    const app = AppModel.create()

    expect(app.getCount()).toHaveTextContent('0')
  })

  it('should allow incrementing the counter', async () => {
    const app = AppModel.create()

    await app.incrementCounter()

    expect(app.getCount()).toHaveTextContent('1')
  })

  it('should not allow decrementing below zero', async () => {
    const app = AppModel.create()

    await app.decrementCounter()

    expect(app.getCount()).toHaveTextContent('0')
  })

  it('should allow decrementing a positive value', async () => {
    const app = AppModel.create()

    await app.incrementCounter()
    await app.decrementCounter()

    expect(app.getCount()).toHaveTextContent('0')
  })
})

class AppModel {
  private readonly user: ReturnType<typeof userEvent.setup>
  private readonly renderResult: RenderResult

  constructor() {
    this.user = userEvent.setup()
    this.renderResult = render(<App />)
  }

  public static create(): AppModel {
    return new AppModel()
  }

  public queryHeading(): HTMLElement | null {
    return this.renderResult.queryByRole('heading')
  }

  public getCount(): HTMLElement {
    return this.renderResult.getByLabelText('count')
  }

  public async decrementCounter(): Promise<void> {
    const decrementButton = this.renderResult.getByText('-')
    await this.user.click(decrementButton)
  }

  public async incrementCounter(): Promise<void> {
    const incrementButton = this.renderResult.getByText('+')
    await this.user.click(incrementButton)
  }
}
