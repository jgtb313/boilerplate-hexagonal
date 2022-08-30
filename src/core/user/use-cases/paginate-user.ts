import { z } from 'zod'

import { pipe } from '@/support/utilities'
import { IDependencies, Pagination } from '@/core/shared/types'

const BasePaginateUser = z
  .object({
    name: z.string().optional(),
  })
export const PaginateUser = z.intersection(
  BasePaginateUser,
  Pagination,
)
export type PaginateUserInput = z.infer<typeof PaginateUser>

const execute = ({ Repositories }: IDependencies) => async ({ name, page, limit }: PaginateUserInput) => {
  return Repositories.user.paginate({
    name,
    page,
    limit,
  })
}

export const paginateUser = (dependencies: IDependencies) => (props: PaginateUserInput) => pipe(PaginateUser.parse, execute(dependencies))(props)
