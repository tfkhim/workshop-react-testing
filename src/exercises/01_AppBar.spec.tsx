/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { AppBar } from '../app/AppBar'
/* eslint-enable */

it('should display a logo', () => {
  givenRenderedAppBar()

  expect.fail(
    'TODO: Add an expect(...) call to make sure the logo is a SVG (e.g. an instance of SVGElement)'
  )
})

it('should display the application name', () => {
  givenRenderedAppBar()

  expect.fail(
    'TODO: Add an expect(...) call to make sure the application name text is  shown'
  )
})

it('should display the first child', () => {
  givenRenderedAppBar()

  expect.fail(
    'TODO: Add an expect(...) call to make sure the first button is present'
  )
})

it('should display the second child', () => {
  givenRenderedAppBar()

  expect.fail(
    'TODO: Add an expect(...) call to make sure the second button is present'
  )
})

function givenRenderedAppBar(): void {
  expect.fail('TODO: Render the application bar with two buttons as children')
  /*
  render(...)
  */
}
