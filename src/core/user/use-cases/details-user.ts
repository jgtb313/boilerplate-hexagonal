import { z } from 'zod'
import { pipe } from 'lodash/fp'

import { IDependencies } from '@/core/shared/types'
import { UserSchema } from '@/core/user/entities'

export const DetailsUser = UserSchema
  .pick({
    id: true,
  })
export type DetailsUserInput = z.infer<typeof DetailsUser>

const execute = ({ Repositories }: IDependencies) => async ({ id }: DetailsUserInput) => {
  return Repositories.user.findById(id as string)
}

export const detailsUser = (dependencies: IDependencies) => (props: DetailsUserInput) => pipe(DetailsUser.parse, execute(dependencies))(props)
