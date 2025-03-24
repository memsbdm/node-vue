import Roles from '#enums/roles'
import Restaurant from '#models/restaurant'
import type User from '#models/user'
import { storeRestaurantValidator } from '#validators/restaurant'
import { Infer } from '@vinejs/vine/types'
import PlaceDetails from '#actions/providers/google/place_details'
import db from '@adonisjs/lucid/services/db'

type Params = {
  user: User
  data: Infer<typeof storeRestaurantValidator>
}

export default class StoreRestaurant {
  async handle({ user, data }: Params) {
    const storeRestaurantDto = await PlaceDetails.handle({ data })

    return db.transaction(async (trx) => {
      const restaurant = await Restaurant.create(storeRestaurantDto, { client: trx })
      await StoreRestaurant.assignAdmin(restaurant, user)
      return restaurant
    })
  }

  private static assignAdmin(restaurant: Restaurant, user: User) {
    return restaurant.related('users').attach({
      [user.id]: {
        role_id: Roles.ADMIN,
      },
    })
  }
}
