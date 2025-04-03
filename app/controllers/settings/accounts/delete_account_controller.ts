import WebLogout from '#actions/auth/http/web_logout'
import DeleteUserAccount from '#actions/settings/delete_user_account'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class DeleteAccountController {
  @inject()
  async handle({ request, response, session, auth }: HttpContext, webLogout: WebLogout) {
    const user = auth.use('web').user!
    const validator = vine.compile(vine.object({ password: vine.string() }))
    const { password } = await request.validateUsing(validator)

    await User.verifyCredentials(user.email, password)
    await DeleteUserAccount.handle({ user })
    await webLogout.handle()

    session.flash('success', 'Your account has been deleted')

    return response.redirect().toRoute('auth.register.render')
  }
}
