import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  id: number
}

export default class DeleteMenu {
  static async handle({ restaurant, id }: Params) {
    const menu = await restaurant.related('menus').query().where({ id }).firstOrFail()

    await menu.delete()
    const newDefaultMenu = await restaurant.related('menus').query().orderBy('order').first()
    if (newDefaultMenu) {
      newDefaultMenu.merge({ isActive: true })
      newDefaultMenu.save()
    }
    return menu
  }
}
