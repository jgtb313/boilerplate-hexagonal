import { z } from 'zod'

export const EmailValidator = z
  .string()
  .email()
export type EmailValidatorInput = z.infer<typeof EmailValidator>
