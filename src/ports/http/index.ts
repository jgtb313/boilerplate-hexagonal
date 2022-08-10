import { IDependencies } from '@/core/shared/types'

export * from './modules/user'

export type IServer = {
  start(port: string, dependencies: IDependencies): Promise<void>
}
