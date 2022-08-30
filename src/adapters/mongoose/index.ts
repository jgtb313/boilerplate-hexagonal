import mongoose from 'mongoose'

import { env } from '@/config'
import { IDatabase } from '@/ports/database'

import { Repositories } from './modules'

const MONGO_URL = env('MONGO_URL')

const connect = async () => mongoose
  .connect(MONGO_URL)
  .then(() => console.log(`Connected on Mongoose ${MONGO_URL}`))

export const Database: IDatabase = {
  connect,
  Repositories,
}
