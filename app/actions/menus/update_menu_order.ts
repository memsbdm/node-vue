import Menu from '#models/menu'
import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  ids: number[]
}

export default class UpdateMenuOrder {
  static async handle({ restaurant, ids }: Params) {
    const menus = await restaurant.getMenus()

    return this.#updateOrder(menus, ids)
  }

  static async #updateOrder(menus: Menu[], ids: number[]) {
    const promises = ids.map((id, order) => {
      const menu = menus.find((record) => record.id === id)
      const isActive = order === 0

      menu?.merge({
        order,
        isActive,
      })

      return menu?.save()
    })

    return Promise.all(promises)
  }
}
