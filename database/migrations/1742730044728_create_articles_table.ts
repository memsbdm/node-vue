import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 30).notNullable()
      table.string('description').notNullable()
      table.float('price').notNullable()
      table.string('image_url').nullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .notNullable()
      table.uuid('restaurant_id').references('restaurants.id').onDelete('CASCADE').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
