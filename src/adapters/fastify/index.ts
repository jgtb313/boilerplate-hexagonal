import { IDependencies } from '@/core/shared/types'
import { server } from '@/adapters/fastify/server'
import { IServer, UserHttp } from '@/ports/http'

server.get('/', (_, reply) => {
  reply.send({ message: 'User Service' })
})

server.get('/health', (_, reply) => {
  reply.send({ message: 'Health' })
})

const start = async (PORT: string, dependencies: IDependencies) => {
  try {
    UserHttp(dependencies)

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
