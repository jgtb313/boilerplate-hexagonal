import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { IDependencies } from '@/core/shared/types'
import { UserSchema } from '@/core/user/entities'

export const DestroyUser = UserSchema
  .pick({
    id: true,
  })
export type DestroyUserInput = z.infer<typeof DestroyUser>

const execute = ({ Repositories }: IDependencies) => async ({ id }: DestroyUserInput) => {
  return Repositories.user.deleteById(id as string)
}

export const destroyUser = (dependencies: IDependencies) => (props: DestroyUserInput) => pipe(DestroyUser.parse, execute(dependencies))(props)
