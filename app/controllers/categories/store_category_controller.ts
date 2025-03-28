import StoreCategory from '#actions/categories/store_category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreCategoryController {
  async handle({ params, request, response, restaurant }: HttpContext) {
    const data = await request.validateUsing(categoryValidator)
    await StoreCategory.handle({
      menuId: params.menuId,
      restaurant,
      data,
    })

    return response.redirect().back()
  }
}
