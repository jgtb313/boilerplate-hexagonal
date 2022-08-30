import { Prisma, User as UserPrisma, UserStatus as UserStatusPrisma } from '@prisma/client'

import { NotFoundError } from '@/support/errors'
import { User, UserEntity } from '@/core/user/entities'
import { prisma } from '@/adapters/prisma/client'
import { IRepositoriesOpts } from '@/ports/database'
import { IUserRepository, FindInput, PaginateInput } from '@/ports/database/modules/user'
import { calculateSkip, PaginateOutput } from '@/ports/database/support'

export const user = ({ Cache }: IRepositoriesOpts): IUserRepository => ({
  async find (params: FindInput): Promise<UserEntity[]> {
    const where: Prisma.UserWhereInput = {}

    if (params.name) {
      where.name = {
        search: params.name,
      }
    }

    const users = await prisma.user.findMany({
      where,
    })

    return users.map(user => User(user).state)
  },

  async paginate ({ page, limit, ...params }: PaginateInput): Promise<PaginateOutput<UserEntity>> {
    const skip = calculateSkip(page, limit)

    const where: Prisma.UserWhereInput = {}

    if (params.name) {
      where.name = {
        search: params.name,
      }
    }

    const [docs, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip,
        take: +limit,
      }),
      prisma.user.count({
        where,
      }),
    ])

    return {
      docs,
      page,
      limit,
      total,
    }
  },

  async findById (id: string): Promise<UserEntity> {
    const cache = await Cache.get<UserEntity>(id)

    if (cache) {
      return cache
    }

    const model = await prisma.user.findUnique({ where: { id } })

    if (!model) {
      throw new NotFoundError('userNotFound')
    }

    return User(model).state
  },

  async emailExists (email: string): Promise<boolean> {
    const model = await prisma.user.findUnique({ where: { email } })
    return !!model
  },

  async create (data: UserEntity): Promise<UserEntity> {
    const model = await prisma.user.create({ data: castToUserPrisma(data) })

    await Cache.set(model.id, model)

    return User(model).state
  },

  async updateById (id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const model = await prisma.user.update({ where: { id }, data: castToUserPrisma(data as UserEntity) })

    return User(model).state
  },

  async deleteById (id: string): Promise<void> {
    const model = await this.findById(id)

    await prisma.user.delete({ where: { id: model.id as string } })
  },
})

const castToUserPrisma = (data: UserEntity): UserPrisma => {
  return {
    ...data,
    id: data.id as string,
    deletedAt: data.deletedAt ?? null,
    createdAt: data.createdAt as Date,
    updatedAt: data.updatedAt as Date,
    status: data.status as UserStatusPrisma,
  }
}
