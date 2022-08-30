import { z } from 'zod'

import {
  DefaultError,
  withError as baseWithError,
  VALIDATION_ERROR_CODE,
} from '@/support/errors'

export const withResponse = <T>(value: T) => value

export const withPaginateResponse = <T>(value: { docs: T, total: number, page: number, limit: number }) => value

export const withError = (error: Error) => {
  const COMMON_ERROR_CODE = 400

  const err = baseWithError(error)

  if (error instanceof z.ZodError) {
    return {
      ...err,
      code: VALIDATION_ERROR_CODE,
    }
  }

  return {
    ...err,
    code: error instanceof DefaultError ? error.code : COMMON_ERROR_CODE,
  }
}

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
