import { env } from '@/config'
import { IDatabase } from '@/ports/database'

import { Repositories } from './modules'

const POSTGRES_URL = env('POSTGRES_URL')

export const connect = async () => {
  console.log(`Connected on Prisma ${POSTGRES_URL}`)
}

export const Database: IDatabase = {
  connect,
  Repositories,
}
