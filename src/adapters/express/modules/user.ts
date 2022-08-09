/* eslint-disable dot-notation */

import { Request, Response, Router } from 'express'

import { CreateUserInput } from '@/core/user/use-cases/create'
import { UserHttp } from '@/ports/http'
import { withError } from '@/ports/http/support'

const router = Router()

router[UserHttp.create.method](UserHttp.create.path, async (req: Request, res: Response) => {
  try {
    const input: CreateUserInput = req.body
    const response = await UserHttp.create.execute(input)
    res.status(200).json(response)
  } catch (err) {
    const error = withError(err as Error)
    res.status(error.code).json(error)
  }
})
