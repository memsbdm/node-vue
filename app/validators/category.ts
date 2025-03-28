import vine from '@vinejs/vine'

export const categoryValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
    description: vine.string().maxLength(100).optional(),
  })
)
