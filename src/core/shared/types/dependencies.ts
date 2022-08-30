import { IRepositories } from '@/ports/database'
import { ICache } from '@/ports/cache'

export type IDependencies = {
  Repositories: IRepositories
  Cache: ICache
}
