import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const PlacesAutocompleteController = () => import('#controllers/providers/google/places_autocomplete_controller')

router.group(()=>{
  // Shared with web
  router.post('/google/places-autocomplete', [PlacesAutocompleteController, 'apiHandle']).use(middleware.auth({guards: ['web', 'api']})).as('api.google.autocomplete')

  // Auth
  router.post('/auth/login', [LoginController, 'apiHandle']).use(middleware.guest({ guards: ['api']}))
  router.post('/auth/register', [RegisterController, 'apiHandle']).use(middleware.guest({ guards: ['api']}))
  router.delete('/auth/logout', [LogoutController, 'apiHandle']).use(middleware.auth({ guards: ['api']}))

})
.prefix('api/v1')
.use(middleware.forceJson())
