import StoreArticle from '#actions/articles/store_article'
import { articleValidator } from '#validators/article'
import { withRestaurantMetaData } from '#validators/helpers/restaurant'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreArticleController {
  async handle({ request, response, restaurant, session }: HttpContext) {
    const data = await request.validateUsing(
      articleValidator,
      withRestaurantMetaData(restaurant.id)
    )

    await StoreArticle.handle({
      restaurant,
      data,
    })

    session.flash('success', 'New article added')

    return response.redirect().back()
  }
}
