import express from 'express'

import { env } from '@/config'
import { IDependencies } from '@/core/shared/types'
import { IServer } from '@/ports/http'

import { UserRoutes } from './modules'
import { server } from './server'

const PORT = env('SERVER_PORT')

server.use(express.urlencoded({ extended: true }))
server.use(express.json({ limit: '256kb' }))

server.get('/', (_, reply) => {
  reply.send({ message: 'Boilerplate' })
})

server.get('/health', (_, reply) => {
  reply.send({ message: 'Health' })
})

const start = async (dependencies: IDependencies) => {
  try {
    server.use('/', UserRoutes(dependencies))

    server.listen(+PORT, () => console.log(`Express Server running on PORT: ${PORT}`))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const Server: IServer = {
  start,
}
