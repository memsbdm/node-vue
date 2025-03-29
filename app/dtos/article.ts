import { BaseModelDto } from '@adocasts.com/dto/base'
import Article from '#models/article'
import CategoryDto from '#dtos/category'
import RestaurantDto from './restaurant.js'

export default class ArticleDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare description: string
  declare price: number
  declare imageUrl: string | null
  declare order: number
  declare categoryId: number
  declare category: CategoryDto | null

  declare restaurantId: string
  declare restaurant: RestaurantDto | null

  constructor(article?: Article) {
    super()

    if (!article) return
    this.id = article.id
    this.name = article.name
    this.description = article.description
    this.price = article.price
    this.imageUrl = article.imageUrl
    this.order = article.order
    this.categoryId = article.categoryId
    this.category = article.category && new CategoryDto(article.category)

    this.restaurantId = article.restaurantId
    this.restaurant = article.restaurant && new RestaurantDto(article.restaurant)
  }
}
