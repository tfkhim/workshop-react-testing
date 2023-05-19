import {
  RenderHookResult,
  act,
  render,
  renderHook,
  screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CSSProperties, FC, useCallback, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

const Counter: FC = () => {
  const props = useCounterViewModel(counterActions)
  return <CounterView {...props} />
}

// ------------------------------------------------------------------
// View
// ------------------------------------------------------------------

type CounterViewProps = {
  counter: string
  counterStyle: CSSProperties
  onIncrement: () => void
  onDecrement: () => void
}

const CounterView: FC<CounterViewProps> = ({
  counter,
  counterStyle,
  onIncrement,
  onDecrement,
}) => {
  return (
    <>
      <button onClick={onDecrement}>-</button>
      <span style={counterStyle}>{counter}</span>
      <button onClick={onIncrement}>+</button>
    </>
  )
}

// ------------------------------------------------------------------
// View Model
// ------------------------------------------------------------------

const useCounterViewModel = ({
  init,
  increment,
  decrement,
  isCritical,
}: CounterModel): CounterViewProps => {
  const [counterState, setCounterState] = useState(init)

  const unitString = counterState.value >= 2 ? 'Apples' : 'Apple'
  const counter = `${counterState.value} ${unitString}`
  const counterStyle = { color: isCritical(counterState) ? 'red' : 'inherit' }

  const onIncrement = useCallback(
    () => setCounterState(increment),
    [setCounterState, increment]
  )

  const onDecrement = useCallback(
    () => setCounterState(decrement),
    [setCounterState, decrement]
  )

  return {
    counter,
    counterStyle,
    onIncrement,
    onDecrement,
  }
}

// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------

type CounterState = {
  readonly value: number
}

const counterActions = {
  init(): CounterState {
    return { value: 0 }
  },

  increment({ value }: CounterState): CounterState {
    return { value: value + 1 }
  },

  decrement(state: CounterState): CounterState {
    const { value } = state
    return value === 0 ? state : { value: value - 1 }
  },

  isCritical({ value }: CounterState): boolean {
    return value > 10
  },
} as const

type CounterModel = typeof counterActions

// ------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------

describe('CounterView', () => {
  it('should render the display value', () => {
    const { counter } = givenRenderedView()

    expect(screen.getByText(counter)).toBeVisible()
  })

  it('should call the event handlers', async () => {
    const { onIncrement } = givenRenderedView()

    const user = userEvent.setup()
    await user.click(screen.getByText('+'))

    expect(onIncrement).toHaveBeenCalledOnce()
  })

  function givenRenderedView(): CounterViewProps {
    const props = {
      counter: 'display value',
      counterStyle: {},
      onIncrement: vi.fn(),
      onDecrement: vi.fn(),
    }

    render(<CounterView {...props} />)

    return props
  }
})

describe('useCounterViewModel', () => {
  it('should format the counter', () => {
    const [{ result }] = givenRenderedHook()

    expect(result.current).toMatchObject({
      counter: '1 Apple',
      counterStyle: { color: 'inherit' },
    })
  })

  it('should call the increment function of the model', () => {
    const [{ result }, { increment }] = givenRenderedHook()

    act(result.current.onIncrement)

    expect(increment).toHaveBeenCalledWith({ value: 1 })
  })

  it('should store the updated state', () => {
    const [{ result }] = givenRenderedHook()

    act(result.current.onIncrement)

    expect(result.current.counter).toStrictEqual('2 Apples')
  })

  function givenRenderedHook(): [
    RenderHookResult<CounterViewProps, CounterModel>,
    CounterModel
  ] {
    const counterModel = {
      init: vi.fn().mockReturnValue({ value: 1 }),
      increment: vi.fn().mockReturnValue({ value: 2 }),
      decrement: vi.fn().mockReturnValue({ value: 0 }),
      isCritical: vi.fn().mockReturnValue(false),
    }

    const view = renderHook(useCounterViewModel, { initialProps: counterModel })

    return [view, counterModel]
  }
})

describe('CounterModel', () => {
  it('should initialize the counter with zero', () => {
    const state = counterActions.init()

    expect(state.value).toStrictEqual(0)
  })

  it('should increment the counter', () => {
    const state = counterActions.init()

    const updatedState = counterActions.increment(state)

    expect(updatedState.value).toStrictEqual(1)
  })
})

describe('Counter', () => {
  it('should be initialized with zero', () => {
    givenRenderedCounter()

    expect(screen.getByText('0 Apple')).toBeVisible()
  })

  it('should increment the counter', async () => {
    givenRenderedCounter()

    const user = userEvent.setup()
    await user.click(screen.getByText('+'))

    expect(screen.getByText('1 Apple')).toBeVisible()
  })

  function givenRenderedCounter() {
    render(<Counter />)
  }
})
