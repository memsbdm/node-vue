import User from '#models/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ApiLogout {
  constructor(protected ctx: HttpContext) {}

  handle() {
    const user = this.ctx.auth.user!
    return User.accessTokens.delete(user, user.currentAccessToken!.identifier)
  }
}
