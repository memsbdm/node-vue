import SetActiveRestaurant from '#actions/restaurants/http/set_active_restaurant'
import StoreRestaurant from '#actions/restaurants/store_restaurant'
import { storeRestaurantValidator } from '#validators/restaurant'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine'

@inject()
export default class StoreRestaurantController {
  constructor(
    protected setActiveRestaurant: SetActiveRestaurant,
    protected storeRestaurant: StoreRestaurant
  ) {}

  render({ inertia }: HttpContext) {
    return inertia.render('restaurants/create')
  }
  async handle({ auth, request, response, session }: HttpContext) {
    const data = await request.validateUsing(storeRestaurantValidator, {
      messagesProvider: new SimpleMessagesProvider({
        'id.required':
          'Please select your restaurant from the list. If not in the list, please contact the support.',
        'database.unique': 'This place is already registered',
      }),
    })
    const restaurant = await this.storeRestaurant.handle({ user: auth.use('web').user!, data })

    this.setActiveRestaurant.handle({ id: restaurant.id })
    session.flash('success', 'Successfully added!')

    return response.redirect().toRoute('menus.store.render')
  }
}
