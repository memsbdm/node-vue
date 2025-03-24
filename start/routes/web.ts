import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const StoreRestaurantController = () => import('#controllers/restaurants/store_restaurant_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.on('/').renderInertia('home').use(middleware.auth())

router
  .group(() => {
    router.get('/register', [RegisterController, 'render']).as('auth.register.render').use(middleware.guest())
    router.post('/register', [RegisterController, 'handle']).as('auth.register.handle').use(middleware.guest())
    router.get('/login', [LoginController, 'render']).as('auth.login.render').use(middleware.guest())
    router.delete('/logout', [LogoutController, 'handle']).as('auth.logout.handle').use(middleware.auth())
  })
  .prefix('/auth')

router.group(() => {
    router.get('/create', [StoreRestaurantController, 'render']).as('restaurants.create.render')
    router.post('/create', [StoreRestaurantController, 'handle']).as('restaurants.create.handle')
}).use(middleware.auth()).prefix('/restaurants')
