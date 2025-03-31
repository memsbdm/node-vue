import DeleteArticle from '#actions/articles/delete_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeleteArticleController {
  async handle({ params, response, restaurant }: HttpContext) {
    await DeleteArticle.handle({
      id: params.id,
      restaurant,
    })

    return response.redirect().back()
  }
}
