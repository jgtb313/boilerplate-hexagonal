import { IRepositories } from '@/ports/database'
import { ICache } from '@/ports/cache'

export type UseCase = {
  Repositories: IRepositories
  Cache: ICache
}
