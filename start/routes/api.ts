import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const LoginController = () => import('#controllers/auth/login_controller')
const PlacesAutocompleteController = () => import('#controllers/providers/google/places_autocomplete_controller')

router.group(()=>{
  router.post('/auth/login', [LoginController, 'apiHandle']).use(middleware.guest({ guards: ['api']}))
  router.post('/google/places-autocomplete', [PlacesAutocompleteController, 'handle']).use(middleware.auth({guards: ['web', 'api']})).as('api.google.autocomplete')
})
.prefix('api/v1')
.use(middleware.forceJson())
