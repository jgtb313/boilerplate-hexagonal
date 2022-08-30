import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { ValidationError } from '@/support/errors'
import { IDependencies } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const CreateUser = UserSchema
  .pick({
    name: true,
    email: true,
  })
export type CreateUserInput = z.infer<typeof CreateUser>

const execute = ({ Repositories }: IDependencies) => async ({ name, email }: CreateUserInput) => {
  const emailExists = await Repositories.user.emailExists(email)

  if (emailExists) {
    throw new ValidationError('emailExists')
  }

  const payload = {
    name,
    email,
  }

  const data = User(payload).create()

  return Repositories.user.create(data)
}

export const createUser = (dependencies: IDependencies) => (props: CreateUserInput) => pipe(CreateUser.parse, execute(dependencies))(props)
