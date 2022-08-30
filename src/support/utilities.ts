import { v4 as uuid } from 'uuid'

export { pipe, first, camelCase, isInteger } from 'lodash/fp'

export { uuid }

export { isValid as isValidDate } from 'date-fns'

export const withID = <T>(value: T) => ({
  id: uuid(),
  ...value,
})

export const replaceSpecialChars = (value: string) => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
