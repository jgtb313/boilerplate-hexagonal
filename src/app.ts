import { Database } from '@/ports/database'
import { Cache } from '@/ports/cache'
import { Server } from '@/ports/http'

const bootstrap = async () => {
  await Database.connect()
  await Cache.connect()
  await Server.start()
}

bootstrap()
