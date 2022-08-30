import { Router } from 'express'

import { IDependencies } from '@/core/shared/types'
import { setupRoutes } from '@/adapters/express/support'
import { UserHttp } from '@/ports/http'

export const UserRoutes = (dependencies: IDependencies) => {
  const router = Router()
  const routes = UserHttp(dependencies)

  setupRoutes(router)(routes)

  return router
}
