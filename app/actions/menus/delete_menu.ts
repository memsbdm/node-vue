import DeleteImage from '#actions/mailer/delete_image'
import Article from '#models/article'
import Restaurant from '#models/restaurant'

type Params = {
  restaurant: Restaurant
  id: number
}

export default class DeleteMenu {
  static async handle({ restaurant, id }: Params) {
    const menu = await restaurant
      .related('menus')
      .query()
      .where({ id })
      .preload('articles')
      .firstOrFail()

    await menu.delete()
    await this.#deleteImagesFromStorage(menu.articles)

    const newDefaultMenu = await restaurant.related('menus').query().orderBy('order').first()
    if (newDefaultMenu) {
      newDefaultMenu.merge({ isActive: true })
      newDefaultMenu.save()
    }
    return menu
  }

  static #deleteImagesFromStorage(articles: Article[]) {
    const promises = articles.map(({ imageUrl }) => {
      if (!imageUrl) {
        return
      }
      return DeleteImage.handle({ fileUrl: imageUrl })
    })
    return Promise.all(promises)
  }
}
