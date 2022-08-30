import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { IDependencies } from '@/core/shared/types'
import { UserSchema } from '@/core/user/entities'

export const EmailExists = UserSchema
  .pick({
    email: true,
  })
export type EmailExistsInput = z.infer<typeof EmailExists>

const execute = ({ Repositories }: IDependencies) => async ({ email }: EmailExistsInput) => {
  return Repositories.user.emailExists(email)
}

export const emailExists = (dependencies: IDependencies) => (props: EmailExistsInput) => pipe(EmailExists.parse, execute(dependencies))(props)
