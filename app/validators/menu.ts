import vine from '@vinejs/vine'

export const menuValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
  })
)

export const menuOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number()),
  })
)
