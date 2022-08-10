import { IDependencies } from '@/core/shared/types'
import { Database } from '@/adapters/prisma'
import { Cache } from '@/adapters/redis'
import { Server } from '@/adapters/express'
import { IRepositoriesOpts } from '@/ports/database'

const RepositoriesOpts: IRepositoriesOpts = {
  Cache,
}
const Dependencies: IDependencies = {
  Repositories: Database.Repositories(RepositoriesOpts),
  Cache,
}

const bootstrap = async () => {
  await Database.connect()
  await Cache.connect()
  await Server.start(Dependencies)
}

bootstrap()
