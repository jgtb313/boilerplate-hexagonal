import { ICache } from '@/ports/cache'

type CacheData = {
  [k: string]: string
}
const cache: CacheData = {}

const connect = async () => {
  console.log('Connected on Cache In Memory')
}

const get = async <T>(key: string): Promise<T | undefined> => {
  const value = cache[key]

  if (!value) {
    return
  }

  return JSON.parse(value)
}

const set = async <T>(key: string, value: T) => {
  cache[key] = JSON.stringify(value)
}

const exists = async (key: string): Promise<Boolean> => {
  return !!get(key)
}

const del = async (key: string) => {
  delete cache[key]
}

export const Cache: ICache = {
  connect,
  get,
  set,
  exists,
  delete: del,
}
