import { IDependencies } from '@/core/shared/types'
import { Database } from '@/adapters/db-in-memory'
import { Cache } from '@/adapters/cache-in-memory'
import { IRepositoriesOpts } from '@/ports/database'

const RepositoriesOpts: IRepositoriesOpts = {
  Cache,
}

export const Dependencies: IDependencies = {
  Repositories: Database.Repositories(RepositoriesOpts),
  Cache,
}
