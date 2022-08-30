import { Request, Response, Router } from 'express'

import { IModuleRoute } from '@/ports/http'
import { withError } from '@/ports/http/support'

type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete'

export const setupRoutes = (router: Router) => (routes: IModuleRoute) => {
  Object
    .values(routes)
    .forEach(({ path, method, execute }) => {
      router[method.toLowerCase() as HTTPMethods](path, async (req: Request, res: Response) => {
        try {
          const input = {
            query: req.query ?? {},
            params: req.params ?? {},
            body: req.body ?? {},
            headers: req.headers ?? {},
          }
          const response = await execute(input)
          res.status(200).json(response)
        } catch (err) {
          const error = withError(err as Error)
          res.status(error.code).json(error.error)
        }
      })
    })
}
