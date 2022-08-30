import { IDependencies } from '@/core/shared/types'
import { setupRoutes } from '@/adapters/fastify/support'
import { UserHttp } from '@/ports/http'

export const UserRoutes = (dependencies: IDependencies) => {
  const routes = UserHttp(dependencies)

  setupRoutes(routes)
}
