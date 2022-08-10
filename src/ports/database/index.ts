import { ICache } from '@/ports/cache'
import { IUserRepository } from './modules/user'

export type IRepositoriesOpts = {
  Cache: ICache
}

export type IRepositories = {
  user: IUserRepository
}

export type IDatabase = {
  Repositories(opts: IRepositoriesOpts): IRepositories,
  connect(): Promise<void>
}
