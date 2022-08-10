import { IDependencies } from '@/core/shared/types'
import { create as execute, CreateUserInput } from '@/core/user/use-cases/create'
import { withResponse } from '@/ports/http/support'

const create = {
  path: '/users',
  method: 'POST',
  execute: (dependencies: IDependencies) => async (input: CreateUserInput) => {
    const { id } = await execute(dependencies)(input)
    return withResponse({
      message: 'userCreatedSuccessful',
      data: {
        id,
      },
    })
  },
}

export const UserHttp = {
  create,
}
