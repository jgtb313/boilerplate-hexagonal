import { v4 as uuid } from 'uuid'

import { NotFoundError } from '@/support/errors'
import { IRepositoriesOpts } from '@/ports/database'
import { IUserRepository, CreateUserDatabaseInput } from '@/ports/database/modules/user'
import { User, UserEntity } from '@/core/user/entities'

const Users: UserEntity[] = []

export const user = ({ Cache }: IRepositoriesOpts): IUserRepository => ({
  async findById (id: string): Promise<UserEntity> {
    const cache = await Cache.get(id)

    if (cache) {
      return cache as UserEntity
    }

    const model = Users.find(user => user.id === id)

    if (!model) {
      throw new NotFoundError('userNotFound')
    }

    return User(model).state
  },

  async create (data: CreateUserDatabaseInput): Promise<UserEntity> {
    const model = {
      ...data,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    Users.push(model)

    await Cache.set(model.id, model)

    return User(model).state
  },
})
