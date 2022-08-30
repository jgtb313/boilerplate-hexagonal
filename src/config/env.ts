type Envs =
  | 'STAGE'
  | 'SERVER_PORT'
  | 'POSTGRES_URL'
  | 'MONGO_URL'
  | 'REDIS_URL'

export const env = (value: Envs) => {
  const prop = process.env[value]

  if (!prop) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
