import { Request, Response, Router } from 'express'

import { IDependencies } from '@/core/shared/types'
import { CreateUserInput } from '@/core/user/use-cases/create'
import { UserHttp } from '@/ports/http'
import { withError } from '@/ports/http/support'

export const UserRoutes = (dependencies: IDependencies) => {
  const router = Router()
  const routes = UserHttp(dependencies)

  router.post(routes.create.path, async (req: Request, res: Response) => {
    try {
      const input: CreateUserInput = req.body
      const response = await routes.create.execute(input)
      res.status(200).json(response)
    } catch (err) {
      const error = withError(err as Error)
      res.status(error.code).json(error.error)
    }
  })

  return router
}
