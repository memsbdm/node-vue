import ApiLogout from '#actions/auth/http/api_logout'
import WebLogout from '#actions/auth/http/web_logout'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  @inject()
  async handle({ response, session }: HttpContext, webLogout: WebLogout) {
    await webLogout.handle()
    session.flash('success', 'Successfully logged out')

    return response.redirect().toRoute('auth.login.render')
  }

  @inject()
  async apiHandle({ response }: HttpContext, apiLogout: ApiLogout) {
    await apiLogout.handle()

    return response.noContent()
  }
}
