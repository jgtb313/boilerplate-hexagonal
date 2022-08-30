import { IDependencies } from '@/core/shared/types'
import { Database } from '@/adapters/prisma'
import { Server } from '@/adapters/fastify'
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
