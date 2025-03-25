import { Infer } from '@vinejs/vine/types'
import { passwordResetValidator } from '#validators/auth'
import VerifyPasswordResetToken from './verify_password_reset_token.js'
import { Exception } from '@adonisjs/core/exceptions'
import ExpirePasswordResetTokens from './expire_password_reset_tokens.js'

type Params = {
  data: Infer<typeof passwordResetValidator>
}

export default class ResetPassword {
  static async handle({ data }: Params) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({ encryptedValue: data.value })

    if (!isValid) {
      throw new Exception('The password reset token provided is invalid or expired', {
        code: 'E_UNAUTHORIZED',
        status: 403,
      })
    }

    await user!.merge({ password: data.password }).save()
    await ExpirePasswordResetTokens.handle({ user: user! })

    return user!
  }
}
