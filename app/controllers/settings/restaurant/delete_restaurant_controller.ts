import DeleteRestaurant from '#actions/restaurants/delete_restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteRestaurantController {
  async handle({ params, response, auth, session }: HttpContext) {
    const restaurant = await DeleteRestaurant.handle({
      user: auth.user!,
      id: params.id,
    })

    session.flash('success', `Your ${restaurant.name} has been deleted`)

    return response.redirect().toPath('/')
  }
}
