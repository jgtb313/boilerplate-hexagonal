import { z } from 'zod'

import { pipe } from '@/support/utilities'
import { ValidationError } from '@/support/errors'
import { IDependencies } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const DeleteUser = UserSchema
  .pick({
    id: true,
  })
export type DeleteUserInput = z.infer<typeof DeleteUser>

const execute = ({ Repositories }: IDependencies) => async ({ id }: DeleteUserInput) => {
  const model = await Repositories.user.findById(id)

  const user = User(model)

  if (user.isDeleted()) {
    throw new ValidationError('userNotFound')
  }

  const deleted = user.delete()

  return Repositories.user.updateById(user.state.id, deleted)
}

export const deleteUser = (dependencies: IDependencies) => (props: DeleteUserInput) => pipe(DeleteUser.parse, execute(dependencies))(props)
