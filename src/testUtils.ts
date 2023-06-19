import {
  Matcher,
  queries as baseQueries,
  buildQueries,
  queryAllByRole,
  queryAllByText,
} from '@testing-library/react'

const queryAllListItemsByChildText = (container: HTMLElement, id: Matcher) =>
  queryAllByRole(container, 'listitem').filter((element) => {
    return queryAllByText(element, id).length > 0
  })

const getMultipleError = (_container: Element | null, text: string) =>
  `Found multiple listitem elements with child text: ${text}`

const getMissingError = (_container: Element | null, text: string) =>
  `Unable to find a listitem element with child text: ${text}`

const [
  queryListItemByChildText,
  getAllListItemsByChildText,
  getListItemByChildText,
  findAllListItemsByChildText,
  findListItemByChildText,
] = buildQueries(
  queryAllListItemsByChildText,
  getMultipleError,
  getMissingError
)

export const queries = {
  ...baseQueries,
  queryAllListItemsByChildText,
  queryListItemByChildText,
  getAllListItemsByChildText,
  getListItemByChildText,
  findAllListItemsByChildText,
  findListItemByChildText,
}
