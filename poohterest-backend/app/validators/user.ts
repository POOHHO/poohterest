import vine from '@vinejs/vine'

const schema =  vine.object({
    username: vine.string().minLength(6).unique( async(db, value)=>{
        const user = await db.from('users')
                             .where('username',value)
                             .first()
        return !user
    }),
    email: vine.string().minLength(6).unique( async(db, value)=>{
        const email = await db.from('users')
                             .where('email',value)
                             .first()
        return !email
    }),
    password: vine.string().minLength(6).confirmed()
})

export const registerUserValidator = vine.compile(schema)