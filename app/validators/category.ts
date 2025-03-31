import vine from '@vinejs/vine'

export const categoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
    description: vine.string().maxLength(100).nullable().optional(),
  })
)

export const categoryOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)
