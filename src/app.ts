import { bootstrap as Bootstrap, Dependencies } from '@/bootstrap'
import { Server } from '@/adapters/fastify'

const bootstrap = async () => {
  await Bootstrap()
  await Server.start(Dependencies)
}

bootstrap()
