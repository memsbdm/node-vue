import { BaseModel, column } from '@adonisjs/lucid/orm'
import { WithRestaurant } from './mixins/with_restaurant.js'
import { compose } from '@adonisjs/core/helpers'

export default class Menu extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare order: number

  @column()
  declare isDefault: boolean
}
