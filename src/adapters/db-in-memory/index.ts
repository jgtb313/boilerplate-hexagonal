import { IDatabase } from '@/ports/database'
import { Repositories } from './modules'

export const connect = async () => {
  console.log('Connected on DB in Memory')
}

export const Database: IDatabase = {
  connect,
  Repositories,
}
