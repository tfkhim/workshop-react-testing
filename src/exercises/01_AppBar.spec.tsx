import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { AppBar } from '../app/AppBar'

it('should display a logo', () => {
  givenRenderedAppBar()

  expect(screen.getByLabelText('logo')).toBeInstanceOf(SVGElement)
})

it('should display the application name', () => {
  givenRenderedAppBar()

  expect(screen.getByRole('heading')).toHaveTextContent('Tasks')
})

it('should display the first child', () => {
  givenRenderedAppBar()

  expect(screen.getByRole('button', { name: 'Button 1' })).toBeVisible()
})

it('should display the second child', () => {
  givenRenderedAppBar()

  expect(screen.getByRole('button', { name: 'Button 2' })).toBeVisible()
})

function givenRenderedAppBar(): void {
  render(
    <AppBar>
      <button>Button 1</button>
      <button>Button 2</button>
    </AppBar>
  )
}
