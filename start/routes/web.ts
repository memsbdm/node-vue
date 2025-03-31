import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UpdateArticleOrderController = () => import('#controllers/articles/update_article_order_controller')
const UpdateCategoryOrderController = () => import('#controllers/categories/update_category_order_controller')
const UpdateArticleController = () => import('#controllers/articles/update_article_controller')
const DeleteArticleController = () => import('#controllers/articles/delete_article_controller')
const StoreArticleController = () => import('#controllers/articles/store_article_controller')
const StoreCategoryController = () => import('#controllers/categories/store_category_controller')
const UpdateCategoryController = () => import('#controllers/categories/update_category_controller')
const DeleteCategoryController = () => import('#controllers/categories/delete_category_controller')
const ShowMenuController = () => import('#controllers/menus/show_menu_controller')
const UpdateMenuOrderController = () => import('#controllers/menus/update_menu_order_controller')
const DeleteMenuController = () => import('#controllers/menus/delete_menu_controller')
const UpdateMenuController = () => import('#controllers/menus/update_menu_controller')
const StoreMenuController = () => import('#controllers/menus/store_menu_controller')
const ActiveRestaurantController = () => import('#controllers/restaurants/active_restaurant_controller')
const StoreRestaurantController = () => import('#controllers/restaurants/store_restaurant_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const ForgotPasswordController = () => import('#controllers/auth/forgot_password_controller')

router.on('/').renderInertia('home').use([middleware.auth(), middleware.restaurant()])

/*
** Auth
*/
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

/*
** Restaurants
*/
router.group(() => {
  router.get('/create', [StoreRestaurantController, 'render']).as('create.render')
  router.post('/create', [StoreRestaurantController, 'handle']).as('create.handle')
  router.get('/:id', [ActiveRestaurantController, 'handle']).as('active.handle')
})
  .use(middleware.auth())
  .prefix('/restaurants')
  .as('restaurants')

/*
** Menus
*/
router.group(() => {
  router.get('/', [StoreMenuController, 'render']).as('store.render')
  router.get('/:id', [ShowMenuController, 'render']).as('show.render')
  router.post('/', [StoreMenuController, 'handle']).as('store.handle')
  router.put('/order', [UpdateMenuOrderController, 'handle']).as('order.handle')
  router.put('/:id', [UpdateMenuController, 'handle']).as('update.handle')
router.delete('/:id', [DeleteMenuController, 'handle']).as('delete.handle')
})
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/menus')
  .as('menus')

/*
** Categories
*/
router.group(()=>{
  router.post('/menus/:menuId/categories', [StoreCategoryController,'handle']).as('store.handle')
  router.put('/menus/:menuId/categories/:categoryId', [UpdateCategoryController,'handle']).as('update.handle')
  router.patch('/menus/:menuId/categories/order', [UpdateCategoryOrderController,'handle']).as('order.handle')
  router.delete('/menus/:menuId/categories/:categoryId', [DeleteCategoryController,'handle']).as('delete.handle')
})
  .use([middleware.auth(), middleware.restaurant()])
  .as('categories')

/*
** Articles
*/
router.group(()=>{
  router.post('/', [StoreArticleController,'handle']).as('store.handle')
  router.put('/:id', [UpdateArticleController,'handle']).as('update.handle')
  router.delete('/:id', [DeleteArticleController,'handle']).as('delete.handle')
})
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/articles')
  .as('articles')

router.patch('/menus/:menuId/articles/order', [UpdateArticleOrderController, 'handle']).use([middleware.auth(), middleware.restaurant()]).as('articles.order.handle')
