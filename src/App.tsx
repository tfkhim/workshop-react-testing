import { FC, useState } from 'react'

export const App: FC = () => {
  return (
    <>
      <h1>Counting things</h1>
      <Counter />
    </>
  )
}

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
