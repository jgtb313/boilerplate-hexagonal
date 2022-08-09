import { User as UserPrisma, UserStatus } from '@prisma/client'

import { ValidationError } from '@/support/errors'
import { IRepositoriesOpts } from '@/ports/database'
import { IUserRepository, CreateUserDatabaseInput } from '@/ports/database/modules/user'
import { User, UserEntity } from '@/core/user/entities'

import { prisma } from '@/adapters/prisma/client'

export const user = ({ Cache }: IRepositoriesOpts): IUserRepository => ({
  findById: async (id: string): Promise<UserEntity> => {
    const cache = await Cache.get(id)

    if (cache) {
      return cache as UserEntity
    }

    const model = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!model) {
      throw new ValidationError('userNotFound')
    }

    return User(model).state
  },

  create: async (data: CreateUserDatabaseInput): Promise<UserEntity> => {
    const model = await prisma.user.create({
      data: castToUserPrisma(data),
    })

    await Cache.set(model.id, model)

    return User(model).state
  },
})

const castToUserPrisma = (data: UserEntity): UserPrisma => {
  return {
    ...data,
    id: data.id as string,
    deletedAt: data.deletedAt ?? null,
    createdAt: data.createdAt as Date,
    updatedAt: data.updatedAt as Date,
    status: data.status as UserStatus,
  }
}
