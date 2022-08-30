import fastifyStatic from '@fastify/static'
import path from 'path'

import { env } from '@/config'
import { IDependencies } from '@/core/shared/types'
import { IServer } from '@/ports/http'

import { UserRoutes } from './modules'
import { server } from './server'

const PORT = env('SERVER_PORT')

server.register(fastifyStatic, {
  root: path.join(process.cwd(), 'docs'),
  prefix: '/docs',
})

server.get('/', (_, reply) => {
  reply.send({ message: 'Boilerplate' })
})

server.get('/health', (_, reply) => {
  reply.send({ message: 'Health' })
})

const start = async (dependencies: IDependencies) => {
  try {
    UserRoutes(dependencies)

    await server.listen({ port: +PORT })

    console.log(`Fastify Server running on PORT: ${PORT}`)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

export const Server: IServer = {
  start,
}
