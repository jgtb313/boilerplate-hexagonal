import { z } from 'zod'

import { first, camelCase } from '@/support/utilities'

type DefaultErrorInput = {
  name: string
  code: number
  message: string
}

export class DefaultError extends Error {
  code: number

  constructor ({ name, code, message }: DefaultErrorInput) {
    super(message)
    this.name = name
    this.code = code
  }
}

export class AuthError extends DefaultError {
  constructor (message: string = 'Unauthorized') {
    super({ name: 'AuthError', code: 401, message })
  }
}

export class ForbiddenError extends DefaultError {
  constructor (message: string) {
    super({ name: 'ForbiddenError', code: 403, message })
  }
}

export class NotFoundError extends DefaultError {
  constructor (message: string) {
    super({ name: 'NotFoundError', code: 404, message })
  }
}

export const VALIDATION_ERROR_CODE = 422
export class ValidationError extends DefaultError {
  constructor (message: string) {
    super({ name: 'ValidationError', code: VALIDATION_ERROR_CODE, message })
  }
}

export class UnknownError extends DefaultError {
  constructor () {
    super({ name: 'UnknownError', code: 418, message: 'Unknown error' })
  }
}

export type CustomMessage = {
  [k: string]: string
}
export const withError = (error: Error) => {
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
      return camelCase(customMessages[issue.message] || issue.message)
    }

    return {
      error: {
        message: 'validationFailed',
        errors: error.issues.map(issue => ({
          [getIssuePath(issue) as string]: getIssueMessage(issue),
        })),
      },
    }
  }

  return {
    error: {
      message: error.message,
    },
  }
}
