import { BaseModel, belongsTo, column, hasManyThrough } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasManyThrough } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { WithRestaurant } from './mixins/with_restaurant.js'
import Category from './category.js'

export default class Article extends compose(BaseModel, WithRestaurant) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare imageUrl: string | null

  @column()
  declare categoryId: number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
