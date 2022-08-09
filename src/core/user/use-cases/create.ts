import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { UseCase } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const CreateUser = UserSchema
  .pick({ name: true })
export type CreateUserInput = z.infer<typeof CreateUser>

const execute = ({ Repositories }: UseCase) => async ({ name }: CreateUserInput) => {
  const payload = {
    name,
  }

  const data = User(payload).create()

  return Repositories.user.create(data)
}

export const create = (opts: UseCase) => (props: CreateUserInput) => pipe(CreateUser.parse, execute(opts))(props)
