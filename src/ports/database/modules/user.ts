import { UserEntity } from '@/core/user/entities'
import { CreateUserInput } from '@/core/user/use-cases/create'

export type CreateUserDatabaseInput = CreateUserInput & Pick<UserEntity, 'status'>

export type IUserRepository = {
  findById(id: string): Promise<UserEntity>
  create(data: CreateUserDatabaseInput): Promise<UserEntity>
}
