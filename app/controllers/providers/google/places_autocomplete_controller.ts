import PlacesAutocomplete from '#actions/providers/google/places_autocomplete'
import { placesAutocompleteValidator } from '#validators/provider'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlacesAutocompleteController {
  @inject()
  async apiHandle({ request }: HttpContext, placesAutocomplete: PlacesAutocomplete) {
    const headers = request.headers()
    headers.accept = 'application/json'

    const data = await request.validateUsing(placesAutocompleteValidator)
    const places = await placesAutocomplete.handle({ data })

    return places
  }
}
