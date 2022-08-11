import { IDependencies } from '@/core/shared/types'
import { create, CreateUserInput } from '@/core/user/use-cases/create'
import { withResponse, HttpMethods } from '@/ports/http/support'

export const UserHttp = (dependencies: IDependencies) => ({
  create: {
    path: '/users',
    method: HttpMethods.POST,
    execute: async (input: CreateUserInput) => {
      const { id } = await create(dependencies)(input)
      return withResponse({
        message: 'userCreatedSuccessful',
        data: {
          id,
        },
      })
    },
  },
})
