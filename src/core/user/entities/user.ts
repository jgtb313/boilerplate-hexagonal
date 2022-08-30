import { z } from 'zod'

import { withID } from '@/support/utilities'
import { EmailValidator, DateValidator } from '@/core/shared/types'

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

const Email = EmailValidator

const Status = UserStatus
  .nullish()

const DeletedAt = DateValidator
  .nullish()

const CreatedAt = DateValidator
  .nullish()

const UpdatedAt = DateValidator
  .nullish()

export const UserSchema = z.object({
  id: ID,
  name: Name,
  email: Email,
  status: Status,
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
})
export type UserEntity = z.infer<typeof UserSchema>

export const User = (user: UserEntity) => ({
  state: Object.freeze(
    withID(
      UserSchema.parse(user),
    ),
  ),

  create () {
    return {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      status: UserStatus.Values.ACTIVE as UserStatusEnum,
    }
  },

  update (data: Partial<UserEntity>) {
    return {
      ...this.state,
      ...data,
      status: data.status as UserStatusEnum,
    }
  },

  delete () {
    return {
      ...this.state,
      status: UserStatus.Values.DELETED as UserStatusEnum,
      deletedAt: new Date(),
    }
  },

  isActive () {
    return this.state.status === UserStatus.Values.ACTIVE
  },

  isInactive () {
    return this.state.status === UserStatus.Values.INACTIVE
  },

  isDeleted () {
    return this.state.status === UserStatus.Values.DELETED
  },
})
