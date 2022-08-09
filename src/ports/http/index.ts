export * from './modules/user'

export type IServer = {
  start(): Promise<void>
}

export * from '@/adapters/fastify'
