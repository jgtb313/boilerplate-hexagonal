import { v4 as uuid } from 'uuid'

import { NotFoundError } from '@/support/errors'
import { replaceSpecialChars } from '@/support/utilities'
import { User, UserEntity } from '@/core/user/entities'
import { IRepositoriesOpts } from '@/ports/database'
import { IUserRepository, FindInput, PaginateInput } from '@/ports/database/modules/user'
import { PaginateOutput } from '@/ports/database/support'

import { paginate } from '../support'

let Users: UserEntity[] = []

export const user = ({ Cache }: IRepositoriesOpts): IUserRepository => ({
  async find (params: FindInput): Promise<UserEntity[]> {
    const docs = Users
      .filter(user => {
        if (params.name) {
          return replaceSpecialChars(user.name).toLowerCase().startsWith(replaceSpecialChars(params.name).toLowerCase())
        }

        return true
      })
      .map(user => User(user).state)

    return docs
  },

  async paginate ({ page, limit, ...params }: PaginateInput): Promise<PaginateOutput<UserEntity>> {
    const data = await this.find(params)

    return paginate<UserEntity>(data, page, limit)
  },

  async findById (id: string): Promise<UserEntity> {
    const cache = await Cache.get<UserEntity>(id)

    if (cache) {
      return cache
    }

    const model = Users.find(user => user.id === id)

    if (!model) {
      throw new NotFoundError('userNotFound')
    }

    return User(model).state
  },

  async emailExists (email: string): Promise<boolean> {
    return Users.some(user => user.email === email)
  },

  async create (data: UserEntity): Promise<UserEntity> {
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

  async updateById (id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const model = await this.findById(id)

    const updated = {
      ...model,
      ...data,
    }

    Users = Users.map(user => user.id === model.id ? updated : user)

    return updated
  },

  async deleteById (id: string): Promise<void> {
    const model = await this.findById(id)

    Users = Users.filter(user => user.id !== model.id)
  },
})
