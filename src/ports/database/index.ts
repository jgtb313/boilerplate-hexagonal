import { ICache } from '@/ports/cache'

import { IRepositories } from './modules'

export { IRepositories }

export type IRepositoriesOpts = {
  Cache: ICache
}

export type IDatabase = {
  connect(): Promise<void>
  Repositories(opts: IRepositoriesOpts): IRepositories,
}
