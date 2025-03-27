import Restaurant from '#models/restaurant'
import { menuValidator } from '#validators/menu'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  data: Infer<typeof menuValidator>
}

export default class StoreMenu {
  static async handle({ restaurant, data }: Params) {
    const lastDifficulty = await restaurant
      .related('menus')
      .query()
      .orderBy('order', 'desc')
      .first()

    return restaurant.related('menus').create({
      ...data,
      order: lastDifficulty ? lastDifficulty.order + 1 : 0,
      isDefault: !lastDifficulty,
    })
  }
}
