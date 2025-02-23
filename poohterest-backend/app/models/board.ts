import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Pin from './pin.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Board extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Pin)
  declare pins: HasMany<typeof Pin>
}
