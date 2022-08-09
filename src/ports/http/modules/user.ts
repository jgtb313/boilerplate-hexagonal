import { UseCase } from '@/core/shared/types'
import { create as execute, CreateUserInput } from '@/core/user/use-cases/create'
import { Database } from '@/ports/database'
import { Cache } from '@/ports/cache'
import { withResponse } from '@/ports/http/support'

const repositoriesOpts = {
  Cache,
}

const opts: UseCase = {
  Repositories: Database.Repositories(repositoriesOpts),
  Cache,
}

const create = {
  path: '/users',
  method: 'POST',
  execute: async (input: CreateUserInput) => {
    const { id } = await execute(opts)(input)
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
