import mongoose from 'mongoose'

import { env } from '@/config'
import { IDatabase } from '@/ports/database'
import { Repositories } from './modules'

const DATABASE_URL = env('DATABASE_URL')

const connect = async () => mongoose
  .connect(DATABASE_URL)
  .then(() => console.log(`Connected on Mongoose ${DATABASE_URL}`))

export const Database: IDatabase = {
  connect,
  Repositories,
}
