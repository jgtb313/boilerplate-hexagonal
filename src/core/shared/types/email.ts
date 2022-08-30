import { z } from 'zod'

export const EmailValidator = z
  .string()
  .email()
export type EmailInput = z.infer<typeof EmailValidator>

export const EmailValidatorOptional = EmailValidator.optional()
export type EmailValidatorOptionalInput = z.infer<typeof EmailValidatorOptional>
