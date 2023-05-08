import { FC, useState } from 'react'

import { RenderResult, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

const Counter: FC = () => {
  const [count, setCount] = useState(0)

  const decrement = () =>
    setCount((currentCount: number) => Math.max(currentCount - 1, 0))

  const increment = () => setCount((currentCount: number) => currentCount + 1)

  return (
    <>
      <button onClick={decrement}>-</button>
      <span aria-label="count">{count}</span>
      <button onClick={increment}>+</button>
    </>
  )
}

describe('Plain tests', () => {
  it('should have an initial count of zero', () => {
    const { getByLabelText } = render(<Counter />)

    expect(getByLabelText('count')).toHaveTextContent('0')
  })

  it('should allow incrementing the counter', async () => {
    const user = userEvent.setup()

    const { getByText, getByLabelText } = render(<Counter />)

    const incrementButton = getByText('+')
    await user.click(incrementButton)

    expect(getByLabelText('count')).toHaveTextContent('1')
  })

  it('should not allow decrementing below zero', async () => {
    const user = userEvent.setup()

    const { getByText, getByLabelText } = render(<Counter />)

    const decrementButton = getByText('-')
    await user.click(decrementButton)

    expect(getByLabelText('count')).toHaveTextContent('0')
  })

  it('should allow decrementing a positive value', async () => {
    const user = userEvent.setup()

    const { getByText, getByLabelText } = render(<Counter />)

    const incrementButton = getByText('+')
    await user.click(incrementButton)

    const decrementButton = getByText('-')
    await user.click(decrementButton)

    expect(getByLabelText('count')).toHaveTextContent('0')
  })
})

class CounterModel {
  private readonly user: ReturnType<typeof userEvent.setup>
  private readonly view: RenderResult

  constructor() {
    this.user = userEvent.setup()
    this.view = render(<Counter />)
  }

  public static create(): CounterModel {
    return new CounterModel()
  }

  public getCount(): HTMLElement {
    return this.view.getByLabelText('count')
  }

  public async decrementCounter(): Promise<void> {
    const decrementButton = this.view.getByText('-')
    await this.user.click(decrementButton)
  }

  public async incrementCounter(): Promise<void> {
    const incrementButton = this.view.getByText('+')
    await this.user.click(incrementButton)
  }
}

describe('With Page Model', () => {
  it('should have an initial count of zero', () => {
    const counter = CounterModel.create()

    expect(counter.getCount()).toHaveTextContent('0')
  })

  it('should allow incrementing the counter', async () => {
    const counter = CounterModel.create()

    await counter.incrementCounter()

    expect(counter.getCount()).toHaveTextContent('1')
  })

  it('should not allow decrementing below zero', async () => {
    const counter = CounterModel.create()

    await counter.decrementCounter()

    expect(counter.getCount()).toHaveTextContent('0')
  })

  it('should allow decrementing a positive value', async () => {
    const counter = CounterModel.create()
    await counter.incrementCounter()

    await counter.decrementCounter()

    expect(counter.getCount()).toHaveTextContent('0')
  })
})
