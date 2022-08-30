import { User, UserStatus } from './user'

const USER = {
  name: 'Name',
  email: 'name@email.com',
}

it('create should prepare user for create', () => {
  const user = User(USER)
  const created = user.create()

  expect(created.status).toBe(UserStatus.Values.ACTIVE)
})

it('delete should mark user as deleted', () => {
  const user = User(USER)
  const deleted = user.delete()

  expect(deleted.status).toBe(UserStatus.Values.DELETED)
  expect(deleted.deletedAt).toBeDefined()
})

it('isActive should returns true for active user', () => {
  const user = User({
    ...USER,
    status: UserStatus.Values.ACTIVE,
  })

  const isActive = user.isActive()

  expect(isActive).toBe(true)
})

it('isInactive should returns true for inactive user', () => {
  const user = User({
    ...USER,
    status: UserStatus.Values.INACTIVE,
  })

  const isInactive = user.isInactive()

  expect(isInactive).toBe(true)
})

it('isDeleted should returns true for deleted user', () => {
  const user = User({
    ...USER,
    status: UserStatus.Values.DELETED,
  })

  const isDeleted = user.isDeleted()

  expect(isDeleted).toBe(true)
})
