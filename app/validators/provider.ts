import vine from '@vinejs/vine'

export const placesAutocompleteValidator = vine.compile(
  vine.object({
    input: vine.string(),
  })
)
