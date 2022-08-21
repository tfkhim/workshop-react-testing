import { FC, PropsWithChildren, useState } from 'react'

export const ShowMoreButton: FC<PropsWithChildren> = ({ children }) => {
  const [hidden, setHidden] = useState(true)

  const show = () => setHidden(false)

  return hidden ? <button onClick={show}>Show</button> : <>{children}</>
}
