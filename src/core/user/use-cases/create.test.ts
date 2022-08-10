import { Dependencies } from '@/config/test'
import { create } from '@/core/user/use-cases/create'

it('Should create a user properly', async () => {
  const input = {
    name: 'Name',
  }

  const output = await create(Dependencies)(input)

  expect(output).toHaveProperty('id')
  expect(output).toHaveProperty('createdAt')
  expect(output).toHaveProperty('updatedAt')
})
