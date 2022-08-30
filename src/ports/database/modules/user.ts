import { PaginationInput } from '@/core/shared/types'
import { UserEntity } from '@/core/user/entities'

import { PaginateOutput } from '../support'

export type FindInput = Partial<Pick<UserEntity, 'name' | 'email' | 'status'>>
export type PaginateInput = PaginationInput & FindInput

export type IUserRepository = {
  find(data: FindInput): Promise<UserEntity[]>
  paginate(data: PaginateInput): Promise<PaginateOutput<UserEntity>>
  findById(id: string): Promise<UserEntity>
  emailExists(email: string): Promise<boolean>
  create(data: UserEntity): Promise<UserEntity>
  updateById(id: string, data: Partial<UserEntity>): Promise<UserEntity>
  deleteById(id: string): Promise<void>
}
