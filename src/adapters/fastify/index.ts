import { env } from '@/config'
import { IServer } from '@/ports/http'
import { server } from '@/adapters/fastify/server'
import '@/adapters/fastify/modules'

const PORT = env('PORT')

server.get('/', (_, reply) => {
  reply.send({ message: 'User Service' })
})

server.get('/health', (_, reply) => {
  reply.send({ message: 'Health' })
})

const start = async () => {
  try {
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
