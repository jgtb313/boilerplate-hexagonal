import { HTTPMethods } from 'fastify'

import { IDependencies } from '@/core/shared/types'
import { CreateUserInput } from '@/core/user/use-cases/create'
import { server } from '@/adapters/fastify/server'
import { UserHttp } from '@/ports/http'
import { withError } from '@/ports/http/support'

export const UserRoutes = (dependencies: IDependencies) => {
  const routes = UserHttp(dependencies)

  server.route({
    url: routes.create.path,
    method: routes.create.method as HTTPMethods,
    handler: async (req, reply) => {
      try {
        const input = req.body as CreateUserInput
        const response = await routes.create.execute(input)
        reply.send(response)
      } catch (err) {
        const error = withError(err as Error)
        reply.code(error.code).send(error.error)
      }
    },
  })
}
