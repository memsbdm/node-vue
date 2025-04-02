import Article from '#models/article'
import Restaurant from '#models/restaurant'
import { articleValidator } from '#validators/article'
import { Infer } from '@vinejs/vine/types'
import StoreImage from '#actions/mailer/store_image'

type Params = {
  restaurant: Restaurant
  data: Infer<typeof articleValidator>
}

export default class StoreArticle {
  static async handle({ restaurant, data }: Params) {
    return restaurant.related('articles').create({
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      imageUrl: data.image
        ? await StoreImage.handle({ image: data.image, path: 'articles' })
        : null,
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
