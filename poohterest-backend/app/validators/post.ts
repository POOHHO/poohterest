import vine from '@vinejs/vine'

const schema =  vine.object({
    title: vine.string(),
    body: vine.string()
})

export const createPostValidator = vine.compile(schema)