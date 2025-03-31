import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import SetActiveRestaurant from './set_active_restaurant.js'

@inject()
export default class GetActiveRestaurant {
  constructor(
    protected ctx: HttpContext,
    protected setActiveRestautant: SetActiveRestaurant
  ) {}

  async handle() {
    const activeId = this.ctx.restaurantId

    const restaurant = await this.ctx.auth
      .use('web')
      .user!.related('restaurants')
      .query()
      .if(activeId, (query) => query.where('restaurants.id', activeId!))
      .firstOrFail()
    if (restaurant.id !== activeId) {
      this.setActiveRestautant.handle({ id: restaurant.id })
    }

    return restaurant
  }
}
