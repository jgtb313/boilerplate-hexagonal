import { z } from 'zod'

import { pipe } from '@/support/utilities'
import { IDependencies } from '@/core/shared/types'

export const ListUser = z.object({
  name: z.string().optional(),
})
export type ListUserInput = z.infer<typeof ListUser>

const execute = ({ Repositories }: IDependencies) => async ({ name }: ListUserInput) => {
  return Repositories.user.find({
    name,
  })
}

export const listUser = (dependencies: IDependencies) => (props: ListUserInput) => pipe(ListUser.parse, execute(dependencies))(props)
