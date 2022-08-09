import { env } from '@/config'
import { IServer } from '@/ports/http'
import { server } from '@/adapters/express/server'
import '@/adapters/express/modules'

const PORT = env('PORT')

server.get('/', (_, reply) => {
  reply.send({ message: 'User Service' })
})

server.get('/health', (_, reply) => {
  reply.send({ message: 'Health' })
})

const start = async () => {
  try {
    server.listen(+PORT, () => console.log(`Express Server running on PORT: ${PORT}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const Server: IServer = {
  start,
}
