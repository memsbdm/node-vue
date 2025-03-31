import ApiLogin from '#actions/auth/http/api_login'
import WebLogin from '#actions/auth/http/web_login'
import { loginValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  @inject()
  async handle({ request, response }: HttpContext, webLogin: WebLogin) {
    const data = await request.validateUsing(loginValidator)
    await webLogin.handle({ data })

    return response.redirect().toPath('/')
  }

  @inject()
  async apiHandle({ request }: HttpContext, apiLogin: ApiLogin) {
    const data = await request.validateUsing(loginValidator)
    const { user, token } = await apiLogin.handle({ data })
    return {
      user,
      accessToken: {
        type: 'bearer',
        value: token.value!.release(),
      },
    }
  }
}
