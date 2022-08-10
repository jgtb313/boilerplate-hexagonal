import { IDependencies } from '@/core/shared/types'

export * from './modules/user'

export type IServer = {
  start(dependencies: IDependencies): Promise<void>
}
