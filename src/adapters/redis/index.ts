import { createClient } from 'redis'
import { isString } from 'lodash/fp'

import { env } from '@/config'
import { ICache } from '@/ports/cache'

const REDIS_HOST = env('REDIS_HOST')

const client = createClient({
  url: REDIS_HOST,
})

const connect = async () => {
  client
    .connect()
    .then(
      () => console.log(`Connected on Redis ${REDIS_HOST}`),
    )
}

const get = async (key: string) => {
  const value = await client.get(key)

  if (!value) {
    return
  }

  if (isString(value)) {
    return value
  }

  return JSON.parse(value)
}

const set = async <T>(key: string, value: T) => {
  await client.set(key, JSON.stringify(value))
}

const exists = async (key: string): Promise<Boolean> => {
  const value = await client.exists(key)
  return !!value
}

const del = async (key: string) => {
  await client.del(key)
}

export const Cache: ICache = {
  connect,
  get,
  set,
  exists,
  delete: del,
}
