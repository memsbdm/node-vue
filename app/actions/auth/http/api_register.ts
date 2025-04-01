import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof registerValidator>
}

@inject()
export default class ApiRegister {
  constructor(protected ctx: HttpContext) {}

  async handle({ data }: Params) {
    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    return { user, token }
  }
}
