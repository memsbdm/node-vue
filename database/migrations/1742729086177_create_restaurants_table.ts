import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name', 50).notNullable()
      table.string('description').notNullable()
      table.string('address_line').notNullable()
      table.string('locality').notNullable()
      table.string('region_code').notNullable()
      table.string('postal_code').notNullable()
      table.float('lat', 10, 6).nullable()
      table.float('lng', 10, 6).nullable()
      table.string('phone', 15).nullable()
      table.string('image_url').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
