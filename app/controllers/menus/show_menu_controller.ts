import type { HttpContext } from '@adonisjs/core/http'

export default class ShowMenuController {
  render({ params, inertia, response }: HttpContext) {
    return response.redirect().back()
  }
}
