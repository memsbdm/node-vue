import vine from '@vinejs/vine'

export const storeRestaurantValidator = vine.compile(
  vine.object({
    id: vine.string().unique(async (db, value) => {
      const exists = await db.from('restaurants').where('place_id', value).select('id').first()
      return !exists
    }),
  })
)
