import ArticleDto from './article.js'

export default class StoreArticleDto {
  declare name: string
  declare description: string
  declare price: number
  declare categoryId: number
  declare image?: File

  constructor(article?: ArticleDto) {
    if (!article) return

    this.name = article.name
    this.description = article.description
    this.price = article.price
    this.categoryId = article.categoryId
  }
}
