import { IDependencies } from '@/core/shared/types'
import { listUser, ListUserInput } from '@/core/user/use-cases/list-user'
import { paginateUser, PaginateUserInput } from '@/core/user/use-cases/paginate-user'
import { detailsUser, DetailsUserInput } from '@/core/user/use-cases/details-user'
import { emailExists, EmailExistsInput } from '@/core/user/use-cases/email-exists'
import { createUser, CreateUserInput } from '@/core/user/use-cases/create-user'
import { updateUser, UpdateUserInput } from '@/core/user/use-cases/update-user'
import { deleteUser, DeleteUserInput } from '@/core/user/use-cases/delete-user'
import { destroyUser, DestroyUserInput } from '@/core/user/use-cases/destroy-user'
import { IRoute, IRouteInput } from '@/ports/http'
import { withResponse, withPaginateResponse } from '@/ports/http/support'

export type IUserRouter = {
  list: IRoute
  paginate: IRoute
  details: IRoute
  emailExists: IRoute
  create: IRoute
  update: IRoute
  delete: IRoute
  destroy: IRoute
}

export const UserHttp = (dependencies: IDependencies): IUserRouter => ({
  list: {
    path: '/users',
    method: 'GET',
    execute: async ({ query }: IRouteInput<ListUserInput, {}, {}, {}>) => {
      const data = await listUser(dependencies)(query)
      return withResponse(data)
    },
  },

  paginate: {
    path: '/users/paginate',
    method: 'GET',
    execute: async ({ query }: IRouteInput<PaginateUserInput, {}, {}, {}>) => {
      const data = await paginateUser(dependencies)(query)
      return withPaginateResponse(data)
    },
  },

  emailExists: {
    path: '/users/email-exists',
    method: 'GET',
    execute: async ({ query }: IRouteInput<EmailExistsInput, {}, {}, {}>) => {
      const exists = await emailExists(dependencies)(query)
      return withResponse({ exists })
    },
  },

  details: {
    path: '/users/:id',
    method: 'GET',
    execute: async ({ params }: IRouteInput<{}, DetailsUserInput, {}, {}>) => {
      const data = await detailsUser(dependencies)(params)
      return withResponse(data)
    },
  },

  create: {
    path: '/users',
    method: 'POST',
    execute: async ({ body }: IRouteInput<{}, {}, CreateUserInput, {}>) => {
      const { id } = await createUser(dependencies)(body)
      return withResponse({
        message: 'userCreatedSuccessful',
        data: {
          id,
        },
      })
    },
  },

  update: {
    path: '/users/:id',
    method: 'PATCH',
    execute: async ({ params, body }: IRouteInput<{}, Pick<UpdateUserInput, 'id'>, Omit<UpdateUserInput, 'id'>, {}>) => {
      const data = await updateUser(dependencies)({ ...params, ...body })
      return withResponse(data)
    },
  },

  delete: {
    path: '/users/:id/delete',
    method: 'PATCH',
    execute: async ({ params }: IRouteInput<{}, DeleteUserInput, {}, {}>) => {
      await deleteUser(dependencies)(params)
      return withResponse({
        message: 'userDeletedSuccessful',
      })
    },
  },

  destroy: {
    path: '/users/:id',
    method: 'DELETE',
    execute: async ({ params }: IRouteInput<{}, DestroyUserInput, {}, {}>) => {
      await destroyUser(dependencies)(params)
      return withResponse({
        message: 'userDestroyedSuccessful',
      })
    },
  },
})
