import { HTTPMethods } from 'fastify'

import { CreateUserInput } from '@/core/user/use-cases/create'
import { UserHttp } from '@/ports/http'
import { withError } from '@/ports/http/support'
import { server } from '@/adapters/fastify/server'

server.route({
  url: UserHttp.create.path,
  method: UserHttp.create.method as HTTPMethods,
  handler: async (req, reply) => {
    try {
      const input = req.body as CreateUserInput
      const response = await UserHttp.create.execute(input)
      reply.send(response)
    } catch (err) {
      const error = withError(err as Error)
      reply.code(error.code).send(error.error)
    }
  },
})
