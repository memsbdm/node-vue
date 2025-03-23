import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router
  .group(() => {
    router
      .get('/register', [RegisterController, 'show'])
      .as('auth.register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('auth.register.store')
      .use(middleware.guest())
    router.get('/login', [LoginController, 'show']).as('auth.login.show').use(middleware.guest())
    router.delete('/logout', [LogoutController, 'handle']).as('auth.logout').use(middleware.auth())
  })
  .prefix('/auth')
