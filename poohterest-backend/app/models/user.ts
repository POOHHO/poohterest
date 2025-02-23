import { BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import Board from './board.js'
import Pin from './pin.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Role from '../../contact/role.js'
import Like from './like.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel,AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare profileImage: string | null

  @column()
  declare bio: string | null

  @hasMany(() => Board)
  declare boards: HasMany<typeof Board>

  @hasMany(() => Pin)
  declare pins: HasMany<typeof Pin>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @column()
  declare role: Role

}