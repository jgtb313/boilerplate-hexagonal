import { z } from 'zod'

import { pipe } from '@/support/utilities'
import { IDependencies } from '@/core/shared/types'
import { UserSchema } from '@/core/user/entities'

export const DestroyUser = UserSchema
  .pick({
    id: true,
  })
export type DestroyUserInput = z.infer<typeof DestroyUser>

const execute = ({ Repositories }: IDependencies) => async ({ id }: DestroyUserInput) => {
  return Repositories.user.deleteById(id)
}

export const destroyUser = (dependencies: IDependencies) => (props: DestroyUserInput) => pipe(DestroyUser.parse, execute(dependencies))(props)
