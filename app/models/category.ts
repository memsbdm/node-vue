import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Menu from './menu.js'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'

export default class Category extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare order: number

  @column()
  declare isDefault: boolean

  @column()
  declare menuId: number

  @belongsTo(() => Menu)
  declare menu: BelongsTo<typeof Menu>
}
