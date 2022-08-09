import { UseCase } from '@/core/shared/types'
import { create } from '@/core/user/use-cases/create'
import { Database } from '@/adapters/db-in-memory'
import { Cache } from '@/ports/cache'

const repositoriesOpts = {
  Cache,
}

const opts: UseCase = {
  Repositories: Database.Repositories(repositoriesOpts),
  Cache: Cache,
}

it('Should create a user properly', async () => {
  const input = {
    name: 'Name',
  }

  const output = await create(opts)(input)

  expect(output).toHaveProperty('id')
  expect(output).toHaveProperty('createdAt')
  expect(output).toHaveProperty('updatedAt')
})
