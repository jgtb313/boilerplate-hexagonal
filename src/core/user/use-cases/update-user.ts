import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { ValidationError } from '@/support/errors'
import { IDependencies } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const UpdateUser = UserSchema
  .pick({
    id: true,
    name: true,
  })
export type UpdateUserInput = z.infer<typeof UpdateUser>

const execute = ({ Repositories }: IDependencies) => async ({ id, name }: UpdateUserInput) => {
  const model = await Repositories.user.findById(id)

  const user = User(model)

  if (user.isDeleted()) {
    throw new ValidationError('userNotFound')
  }

  const updated = user.update({ name })

  return Repositories.user.updateById(user.state.id, updated)
}

export const updateUser = (dependencies: IDependencies) => (props: UpdateUserInput) => pipe(UpdateUser.parse, execute(dependencies))(props)
