import { BaseModelDto } from '@adocasts.com/dto/base'
import Category from '#models/category'
import MenuDto from '#dtos/menu'

export default class CategoryDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare order: number
  declare isDefault: boolean
  declare menuId: number
  declare menu: MenuDto | null

  constructor(category?: Category) {
    super()

    if (!category) return
    this.id = category.id
    this.name = category.name
    this.order = category.order
    this.isDefault = category.isDefault
    this.menuId = category.menuId
    this.menu = category.menu && new MenuDto(category.menu)
  }
}
