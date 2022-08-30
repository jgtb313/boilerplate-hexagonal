import * as mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { NotFoundError } from '@/support/errors'
import { User, UserEntity } from '@/core/user/entities'
import { IRepositoriesOpts } from '@/ports/database'
import { IUserRepository, FindInput, PaginateInput } from '@/ports/database/modules/user'
import { PaginateOutput } from '@/ports/database/support'

const collection = 'users'

const UserSchema = {
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  deletedAt: {
    type: Date,
    default: () => null,
  },

  status: {
    type: String,
    required: true,
  },
}

interface UserDocument extends mongoose.Document {}

const Schema = new mongoose.Schema(UserSchema, { timestamps: true })

Schema.plugin(mongoosePaginate)

const Model = mongoose.model<UserDocument, mongoose.PaginateModel<UserDocument>>(collection, Schema, collection)

export const user = ({ Cache }: IRepositoriesOpts): IUserRepository => ({
  async find (params: FindInput): Promise<UserEntity[]> {
    const where: any = {}

    if (params.name) {
      where.name = new RegExp(params.name, 'i')
    }

    const data = await Model.find(where)

    return data.map(model => User({
      ...model.toObject(),
      id: model._id.toString(),
    }).state)
  },

  async paginate ({ page, limit, ...params }: PaginateInput): Promise<PaginateOutput<UserEntity>> {
    const where: any = {}

    if (params.name) {
      where.name = new RegExp(params.name, 'i')
    }

    const { docs: data, totalDocs } = await Model.paginate(where, { page, limit })

    const docs = data.map(model => User({
      ...model.toObject(),
      id: model._id.toString(),
    }).state)

    return {
      docs,
      page,
      limit,
      total: totalDocs,
    }
  },

  async findById (id: string): Promise<UserEntity> {
    const cache = await Cache.get<UserEntity>(id)

    if (cache) {
      return cache
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

  async emailExists (email: string): Promise<boolean> {
    const model = await Model.findOne({ email })
    return !!model
  },

  async create (data: UserEntity): Promise<UserEntity> {
    const model = await new Model(data).save()

    await Cache.set(model.id, model)

    return User({
      ...model.toObject(),
      id: model._id.toString(),
    }).state
  },

  async updateById (id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const model = await Model.findByIdAndUpdate(id, data)

    if (!model) {
      throw new NotFoundError('userNotFound')
    }

    return User({
      ...model.toObject(),
      id: model._id.toString(),
    }).state
  },

  async deleteById (id: string): Promise<void> {
    const model = await this.findById(id)

    await Model.findByIdAndDelete(model.id)
  },
})
