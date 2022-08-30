import { IDependencies } from '@/core/shared/types'
import { Database } from '@/adapters/mongoose'
import { Server } from '@/adapters/express'
import { Cache } from '@/adapters/redis'
import { IRepositoriesOpts } from '@/ports/database'

const RepositoriesOpts: IRepositoriesOpts = {
  Cache,
}

export const Dependencies: IDependencies = {
  Repositories: Database.Repositories(RepositoriesOpts),
  Cache,
}

export {
  Database,
  Server,
}
