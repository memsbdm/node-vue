import UpdateMenuOrder from '#actions/menus/update_menu_order'
import { menuOrderValidator } from '#validators/menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class UpdateMenuOrderController {
  async handle({ request, response, restaurant }: HttpContext) {
    const { ids } = await request.validateUsing(menuOrderValidator)
    await UpdateMenuOrder.handle({ restaurant, ids })

    return response.redirect().back()
  }
}
