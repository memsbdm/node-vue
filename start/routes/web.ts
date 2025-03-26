import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ActiveRestaurantController = () => import('#controllers/restaurants/active_restaurant_controller')
const StoreRestaurantController = () => import('#controllers/restaurants/store_restaurant_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const ForgotPasswordController = () => import('#controllers/auth/forgot_password_controller')

router.on('/').renderInertia('home').use(middleware.auth()).use(middleware.restaurant())

router
  .group(() => {
    router.get('/register', [RegisterController, 'render']).as('register.render').use(middleware.guest())
    router.post('/register', [RegisterController, 'handle']).as('register.handle').use(middleware.guest())
    router.get('/login', [LoginController, 'render']).as('login.render').use(middleware.guest())
    router.post('/login', [LoginController, 'handle']).as('login.handle').use(middleware.guest())
    router.delete('/logout', [LogoutController, 'handle']).as('logout.handle').use(middleware.auth())
    router.get('forgot-password', [ForgotPasswordController, 'render']).as('forgot-password.render').use(middleware.guest())
    router.post('forgot-password', [ForgotPasswordController, 'send']).as('forgot-password.send').use(middleware.guest())
    router.get('forgot-password/reset/:value', [ForgotPasswordController, 'reset']).as('forgot-password.reset').use(middleware.guest())
    router.post('forgot-password/reset', [ForgotPasswordController, 'update']).as('forgot-password.update').use(middleware.guest())
  })
  .prefix('/auth')
  .as('auth')

router.group(() => {
  router.get('/create', [StoreRestaurantController, 'render']).as('create.render')
  router.post('/create', [StoreRestaurantController, 'handle']).as('create.handle')
  router.get('/:id', [ActiveRestaurantController, 'handle']).as('active.handle')
})
  .use(middleware.auth())
  .prefix('/restaurants')
  .as('restaurants')
