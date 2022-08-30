import fastify from 'fastify'
import http from 'http'

export const server = fastify<http.Server>({ logger: true })
