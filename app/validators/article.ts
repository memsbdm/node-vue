import vine from '@vinejs/vine'
import { existsInRestaurant, RestaurantMetaData } from './helpers/restaurant.js'

export const articleValidator = vine.withMetaData<RestaurantMetaData>().compile(
  vine.object({
    name: vine.string().maxLength(100),
    description: vine.string().maxLength(254),
    price: vine.number().transform((value) => Number.parseFloat(value.toFixed(2))),
    image: vine.file({ extnames: ['jpg', 'png', 'jpeg'], size: 5 << 20 }).optional(),
    categoryId: vine.number().exists(existsInRestaurant('categories')),
  })
)

export const articleOrderValidator = vine.compile(
  vine.object({
    categories: vine.array(
      vine.object({
        id: vine.number(),
        articles: vine.array(vine.number()),
      })
    ),
  })
)
