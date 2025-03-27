import vine from '@vinejs/vine'

export const menuValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
  })
)
