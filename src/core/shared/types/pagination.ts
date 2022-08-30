import { z } from 'zod'

import { isInteger } from '@/support/utilities'

export const Pagination = z
  .object({
    page: z.number().or(z.string()).default(1),
    limit: z.number().or(z.string()).default(10),
  })
  .transform(pagination => {
    return {
      page: +pagination.page,
      limit: pagination.limit > 100 ? 100 : +pagination.limit,
    }
  })
  .refine(pagination => isInteger(pagination.page), { path: ['page'], message: 'receivedStringExpectedNumber' })
  .refine(pagination => isInteger(pagination.limit), { path: ['limit'], message: 'receivedStringExpectedNumber' })
export type PaginationInput = z.infer<typeof Pagination>
