import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Pin from './pin.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pinId: number

  @column()
  declare userId: number

  @belongsTo(() => Pin)
  declare pin: BelongsTo<typeof Pin>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
