import { FC, ReactElement, useState } from 'react'

export const LoadEntries: FC = () => {
  const [entries, setEntries] = useState<null | string[]>(null)

  const load = () =>
    fetch('/api/v1/entries')
      .then((response: Response) => response.json())
      .then(setEntries)
      .catch(() => setEntries(['Could not load entries.']))

  return entries === null ? renderButton(load) : renderEntries(entries)
}

function renderButton(load: () => void): ReactElement {
  return <button onClick={load}>Load</button>
}

function renderEntries(entries: string[]): ReactElement {
  return (
    <>
      {entries.map((entry) => (
        <div key={entry}>{entry}</div>
      ))}
    </>
  )
}
