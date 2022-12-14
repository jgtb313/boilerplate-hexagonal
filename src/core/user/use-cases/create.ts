import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { IDependencies } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const CreateUser = UserSchema
  .pick({ name: true })
export type CreateUserInput = z.infer<typeof CreateUser>

const execute = ({ Repositories }: IDependencies) => async ({ name }: CreateUserInput) => {
  const payload = {
    name,
  }

  const data = User(payload).create()

  return Repositories.user.create(data)
}

export const create = (dependencies: IDependencies) => (props: CreateUserInput) => pipe(CreateUser.parse, execute(dependencies))(props)
