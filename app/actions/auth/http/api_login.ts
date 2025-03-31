import User from '#models/user'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof loginValidator>
}

@inject()
export default class ApiLogin {
  constructor(protected ctx: HttpContext) {}

  async handle({ data }: Params) {
    const user = await User.verifyCredentials(data.email, data.password)
    const token = await User.accessTokens.create(user)

    return { user, token }
  }
}
