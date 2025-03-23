import { BaseModelDto } from '@adocasts.com/dto/base'
import Restaurant from '#models/restaurant'
import MenuDto from '#dtos/menu'
import CategoryDto from '#dtos/category'
import ArticleDto from '#dtos/article'
import RestaurantInviteDto from '#dtos/restaurant_invite'

export default class RestaurantDto extends BaseModelDto {
  declare id: number
  declare createdAt: string
  declare updatedAt: string
  declare name: string
  declare description: string
  declare addressLine: string
  declare locality: string
  declare regionCode: string
  declare postalCode: string
  declare lat: number | null
  declare lng: number | null
  declare phone: string | null
  declare imageUrl: string | null
  declare menus: MenuDto[]
  declare categories: CategoryDto[]
  declare articles: ArticleDto[]
  declare invites: RestaurantInviteDto[]

  constructor(restaurant?: Restaurant) {
    super()

    if (!restaurant) return
    this.id = restaurant.id
    this.createdAt = restaurant.createdAt.toISO()!
    this.updatedAt = restaurant.updatedAt.toISO()!
    this.name = restaurant.name
    this.description = restaurant.description
    this.addressLine = restaurant.addressLine
    this.locality = restaurant.locality
    this.regionCode = restaurant.regionCode
    this.postalCode = restaurant.postalCode
    this.lat = restaurant.lat
    this.lng = restaurant.lng
    this.phone = restaurant.phone
    this.imageUrl = restaurant.imageUrl
    this.menus = MenuDto.fromArray(restaurant.menus)
    this.categories = CategoryDto.fromArray(restaurant.categories)
    this.articles = ArticleDto.fromArray(restaurant.articles)
    this.invites = RestaurantInviteDto.fromArray(restaurant.invites)
  }
}
