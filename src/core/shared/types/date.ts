import { z } from 'zod'

import { isValidDate } from '@/support/utilities'

export const DateValidator = z
  .string()
  .or(z.date())
  .transform(value => {
    return new Date(value)
  })
  .refine(value => isValidDate(value), { message: 'invalidDate' })
export type DateValidatorInput = z.infer<typeof DateValidator>
