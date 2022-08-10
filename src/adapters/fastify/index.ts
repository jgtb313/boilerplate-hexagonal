import { env } from '@/config'
import { IDependencies } from '@/core/shared/types'
import { server } from '@/adapters/fastify/server'
import { UserRoutes } from '@/adapters/fastify/modules'
import { IServer } from '@/ports/http'

const PORT = env('SERVER_PORT')

server.get('/', (_, reply) => {
  reply.send({ message: 'User Service' })
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
    console.log(error)
    process.exit(1)
  }
}

export const Server: IServer = {
  start,
}
