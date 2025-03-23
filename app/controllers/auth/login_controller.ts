import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }
}
