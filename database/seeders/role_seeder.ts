import Roles from '#enums/roles'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.MEMBER,
        name: 'Members',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])
  }
}
