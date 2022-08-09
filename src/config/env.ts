type Envs =
  | 'PORT'
  | 'STAGE'
  | 'DATABASE_URL'
  | 'REDIS_HOST'

export const env = (value: Envs) => {
  const prop = process.env[value]

  if (!prop) {
    throw Error(`You must set the env var ${value}`)
  }

  return prop
}
