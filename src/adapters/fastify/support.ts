import { server } from '@/adapters/fastify/server'
import { IModuleRoute } from '@/ports/http'
import { withError } from '@/ports/http/support'

export const setupRoutes = (routes: IModuleRoute) => {
  Object
    .values(routes)
    .forEach(({ path, method, execute }) => {
      server.route({
        url: path,
        method,
        handler: async (req, reply) => {
          try {
            const input = {
              query: req.query,
              params: req.params,
              body: req.body ?? {},
            }
            const response = await execute(input)
            reply.send(response)
          } catch (err) {
            const error = withError(err as Error)
            reply.code(error.code).send(error.error)
          }
        },
      })
    })
}
