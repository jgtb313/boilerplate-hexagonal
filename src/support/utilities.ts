import { v4 as uuid } from 'uuid'

export { pipe, first, camelCase, isInteger } from 'lodash/fp'

export { uuid }

export { isValid as isValidDate } from 'date-fns'

export const withID = <T>(value: T) => ({
  id: uuid(),
  ...value,
})

export const replaceSpecialChars = (value: string) => {
  value = value.replace(/[ÀÁÂÃÄÅ]/, 'A')
  value = value.replace(/[àáâãäå]/, 'a')
  value = value.replace(/[ÈÉÊË]/, 'E')
  value = value.replace(/[Ç]/, 'C')
  value = value.replace(/[ç]/, 'c')

  return value.replace(/[^a-z0-9]/gi, '')
}
