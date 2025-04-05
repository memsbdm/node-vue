import StoreMenu from '#actions/menus/store_menu'
import MenuDto from '#dtos/menu'
import { menuValidator } from '#validators/menu'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreMenuController {
  async render({ inertia, restaurant }: HttpContext) {
    const menus = await restaurant.getMenus()

    return inertia.render('menus/index', {
      menus: MenuDto.fromArray(menus),
    })
  }

  async handle({ request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(menuValidator)
    const menu = await StoreMenu.handle({ restaurant, data })
    session.flash('success', 'Menu successfully added')

    return response.redirect().toRoute('menus.show.render', { id: menu.id })
  }
}
