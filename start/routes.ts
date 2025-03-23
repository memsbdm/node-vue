/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')

router.get('/register', (ctx) => {
  return ctx.inertia.render('auth/register')
})

router.get('/login', (ctx) => {
  return ctx.inertia.render('auth/login')
})
