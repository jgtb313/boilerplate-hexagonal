import { Dependencies } from '@/config/test'
import { createUser } from '@/core/user/use-cases/create-user'

it('should create a user properly', async () => {
  const input = {
    name: 'Name',
    email: 'name',
  }

  const output = await createUser(Dependencies)(input)

  expect(output.id).toBeDefined()
  expect(output.status).toBeDefined()
  expect(output.createdAt).toBeDefined()
  expect(output.updatedAt).toBeDefined()
})
