import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurant_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('restaurant_id').references('restaurants.id').onDelete('CASCADE').notNullable()
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table.integer('role_id').unsigned().references('roles.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
