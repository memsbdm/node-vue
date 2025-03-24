import StoreRestaurant from '#actions/restaurants/store_restaurant'
import { storeRestaurantValidator } from '#validators/restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine'

export default class StoreRestaurantController {
  render({ inertia }: HttpContext) {
    return inertia.render('restaurants/create')
  }

  @inject()
  async handle(
    { auth, request, response, session }: HttpContext,
    storeRestaurant: StoreRestaurant
  ) {
    const data = await request.validateUsing(storeRestaurantValidator, {
      messagesProvider: new SimpleMessagesProvider({
        'database.unique': 'This place is already registered',
      }),
    })
    await storeRestaurant.handle({ user: auth.use('web').user!, data })
    session.flash('success', 'Successfully added!')

    return response.redirect().toPath('/')
  }
}
