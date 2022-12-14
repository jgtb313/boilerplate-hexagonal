import * as mongoose from 'mongoose'

import { NotFoundError } from '@/support/errors'
import { IRepositoriesOpts } from '@/ports/database'
import { IUserRepository, CreateUserDatabaseInput } from '@/ports/database/modules/user'
import { User, UserEntity } from '@/core/user/entities'

const schema = {
  name: {
    type: String,
    required: true,
  },
}

const Schema = new mongoose.Schema(schema, { timestamps: true })

const Model = mongoose.model('users', Schema, 'users')

export const user = ({ Cache }: IRepositoriesOpts): IUserRepository => ({
  async findById (id: string): Promise<UserEntity> {
    const cache = await Cache.get(id)

    if (cache) {
      return User(cache as UserEntity).state
    }

    const model = await Model.findById(id)

    if (!model) {
      throw new NotFoundError('userNotFound')
    }

    return User({
      ...model.toObject(),
      id: model._id.toString(),
    }).state
  },

  async create (data: CreateUserDatabaseInput): Promise<UserEntity> {
    const model = await Model.create(data)

    await Cache.set(model.id, model)

    return User({
      ...model.toObject(),
      id: model._id.toString(),
    }).state
  },
})
