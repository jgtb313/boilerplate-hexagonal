import {
  Dependencies,
  Database,
  Server,
} from '@/support/dependencies'

const bootstrap = async () => {
  await Dependencies.Cache.connect()
  await Database.connect()
  await Server.start(Dependencies)
}

bootstrap()
