import { env } from '@/config'
import { IDatabase } from '@/ports/database'
import { Repositories } from './modules'

const DATABASE_URL = env('DATABASE_URL')

export const connect = async () => {
  console.log(`Connected on Prisma ${DATABASE_URL}`)
}

export const Database: IDatabase = {
  connect,
  Repositories,
}
