import { z } from 'zod'

export const UserStatus = z.enum([
  'ACTIVE',
  'INACTIVE',
  'DELETED',
])
export type UserStatusEnum = z.infer<typeof UserStatus>

const ID = z
  .string()
  .nullish()

const Name = z
  .string()
  .min(1)

const Status = UserStatus
  .nullish()

const DeletedAt = z
  .date()
  .nullish()

const CreatedAt = z
  .date()
  .nullish()

const UpdatedAt = z
  .date()
  .nullish()

export const UserSchema = z.object({
  id: ID,
  name: Name,
  status: Status,
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type UserEntity = z.infer<typeof UserSchema>

export const User = (user: UserEntity) => ({
  state: user,

  create: () => {
    return {
      name: user.name,
      status: UserStatus.Values.ACTIVE as UserStatusEnum,
    }
  },

  update: (data: Partial<UserEntity>) => {
    return {
      name: data.name,
      status: data.status as UserStatusEnum,
    }
  },

  isDeleted: () => {
    return user.status === UserStatus.Values.DELETED
  },

  delete: () => {
    return {
      ...user,
      deletedAt: new Date(),
      status: UserStatus.Values.DELETED as UserStatusEnum,
    }
  },
})
