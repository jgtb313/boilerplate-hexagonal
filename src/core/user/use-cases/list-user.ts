import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { IDependencies } from '@/core/shared/types'

export const ListUser = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
})
export type ListUserInput = z.infer<typeof ListUser>

const execute = ({ Repositories }: IDependencies) => async ({ name, email }: ListUserInput) => {
  return Repositories.user.find({
    name,
    email,
  })
}

export const listUser = (dependencies: IDependencies) => (props: ListUserInput) => pipe(ListUser.parse, execute(dependencies))(props)
