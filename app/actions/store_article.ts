import Article from '#models/article'
import Restaurant from '#models/restaurant'
import { articleValidator } from '#validators/article'
import { Infer } from '@vinejs/vine/types'

type Params = {
  restaurant: Restaurant
  data: Infer<typeof articleValidator>
}

export default class StoreArticle {
  static async handle({ restaurant, data }: Params) {
    return restaurant.related('articles').create({
      ...data,
      order: await this.#findNextOrder(data.categoryId),
    })
  }

  static async #findNextOrder(categoryId: number) {
    const lastCategoryArticle = await Article.query()
      .where({ categoryId })
      .select('order')
      .orderBy('order', 'desc')
      .first()

    return lastCategoryArticle ? lastCategoryArticle.order + 1 : 0
  }
}
