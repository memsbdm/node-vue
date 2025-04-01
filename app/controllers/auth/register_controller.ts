import ApiRegister from '#actions/auth/http/api_register'
import WebRegister from '#actions/auth/http/web_register'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SimpleMessagesProvider } from '@vinejs/vine'

export default class RegisterController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  @inject()
  async handle({ request, response, session }: HttpContext, webRegister: WebRegister) {
    const data = await request.validateUsing(registerValidator, {
      messagesProvider: new SimpleMessagesProvider({
        'fullName.required': 'The full name field must be defined',
        'fullName.maxLength': 'The full name field must not be greater than 254 characters',
      }),
    })
    await webRegister.handle({ data })
    session.flash('success', 'Successfully logged in!')

    return response.redirect().toRoute('restaurants.create.render')
  }

  @inject()
  async apiHandle({ request, response }: HttpContext, apiRegister: ApiRegister) {
    const data = await request.validateUsing(registerValidator, {
      messagesProvider: new SimpleMessagesProvider({
        'fullName.required': 'The full name field must be defined',
        'fullName.maxLength': 'The full name field must not be greater than 254 characters',
      }),
    })
    const { user, token } = await apiRegister.handle({ data })

    return response.status(201).send({
      user,
      accessToken: {
        type: 'bearer',
        value: token.value!.release(),
      },
    })
  }
}
