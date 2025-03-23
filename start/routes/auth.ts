const RegisterController = () => import('#controllers/auth/register_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/register', [RegisterController, 'show']).as('register.show').use(middleware.guest())
router.post('/register', [RegisterController, 'store']).as('register.store').use(middleware.guest())

router.get('/login', (ctx) => {
  return ctx.inertia.render('auth/login')
})
