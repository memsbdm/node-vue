import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import PasswordResetToken from './password_reset_token.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Restaurant from './restaurant.js'
import VerifyEmailToken from './verify_email_token.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare verifiedEmail: boolean

  @hasMany(() => PasswordResetToken)
  declare passwordResetTokens: HasMany<typeof PasswordResetToken>

  @hasMany(() => VerifyEmailToken)
  declare verifyEmailTokens: HasMany<typeof VerifyEmailToken>

  @manyToMany(() => Restaurant, {
    pivotTable: 'restaurant_users',
    pivotColumns: ['role_id'],
  })
  declare restaurants: ManyToMany<typeof Restaurant>
}
