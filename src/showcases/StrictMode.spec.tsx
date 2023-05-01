import { render } from '@testing-library/react'
import { FC, Fragment, PropsWithChildren, StrictMode } from 'react'
import { expect, it } from 'vitest'

it('should contain a single new element', () => {
  testWithWrappedComponent(Fragment)
})

it.fails('because it contains the new element twice with strict mode', () => {
  testWithWrappedComponent(StrictMode)
})

function testWithWrappedComponent(Wrapper: FC<PropsWithChildren>) {
  const { container } = render(
    <Wrapper>
      <ImpureComponent list={['first element']} />
    </Wrapper>
  )

  expect(container).toHaveTextContent(/^first element; new element$/)
}

const ImpureComponent: FC<{ list: string[] }> = ({ list }) => {
  list.push('new element')

  return <>{list.join('; ')}</>
}
