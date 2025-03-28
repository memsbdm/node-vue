import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name', 50).notNullable()
      table.string('alias').notNullable()
      table.string('description').nullable()
      table.string('address').notNullable()
      table.float('lat', 10, 6).nullable()
      table.float('lng', 10, 6).nullable()
      table.string('phone', 30).nullable()
      table.string('image_url').nullable()
      table.boolean('is_verified').notNullable().defaultTo(false)
      table.string('place_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
