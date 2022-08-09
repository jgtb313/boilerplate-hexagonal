import { z } from 'zod'

import { DefaultError, VALIDATION_ERROR_CODE } from '@/support/errors'
import { first, camelCase } from 'lodash'

export const withResponse = <T>(value: T) => value

export const withPaginationResponse = <T>({
  docs,
  count,
  page,
  limit,
}: { docs: T, count: number, page: number, limit: number }): { docs: T, count: number, page: number, limit: number } => ({
    docs,
    count,
    page,
    limit,
  })

export type CustomMessage = {
  [k: string]: string
}
export const withError = (error: Error) => {
  const COMMON_ERROR_CODE = 400

  if (error instanceof z.ZodError) {
    const getIssuePath = (issue: z.ZodIssue) => {
      if (issue.code === z.ZodIssueCode.invalid_string) {
        return issue.validation
      }

      return first(issue.path)
    }

    const getIssueMessage = (issue: z.ZodIssue) => {
      const customMessages: CustomMessage = {
        'String must contain at least 1 character(s)': 'required',
      }
      return customMessages[issue.message] || issue.message
    }

    return {
      code: VALIDATION_ERROR_CODE,
      error: {
        errors: error.issues.map(issue => ({
          [getIssuePath(issue) as string]: camelCase(getIssueMessage(issue)),
        })),
      },
    }
  }

  return {
    code: error instanceof DefaultError ? error.code : COMMON_ERROR_CODE,
    error: {
      message: error.message,
    },
  }
}
