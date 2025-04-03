import vine from '@vinejs/vine'

export const storeRestaurantValidator = vine.compile(
  vine.object({
    id: vine.string().unique(async (db, value) => {
      const exists = await db
        .from('restaurants')
        .where('place_id', value)
        .andWhere('is_verified', true)
        .select('id')
        .first()
      return !exists
    }),
  })
)

export const updateRestaurantValidator = vine.compile(
  vine.object({
    alias: vine.string().maxLength(30),
    phone: vine
      .string()
      .nullable()
      .transform((input) => input?.replace(/\s+/g, '')),
    description: vine.string().nullable(),
  })
)
