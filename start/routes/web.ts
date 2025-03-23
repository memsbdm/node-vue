import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home').use(middleware.auth())
