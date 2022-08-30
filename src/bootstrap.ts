import { IDependencies } from '@/core/shared/types'
import { Database } from '@/adapters/mongoose'
import { Cache } from '@/adapters/redis'
import { IRepositoriesOpts } from '@/ports/database'

const RepositoriesOpts: IRepositoriesOpts = {
  Cache,
}

export const Dependencies: IDependencies = {
  Repositories: Database.Repositories(RepositoriesOpts),
  Cache,
}

export const bootstrap = async () => {
  await Dependencies.Cache.connect()
  await Database.connect()
}
