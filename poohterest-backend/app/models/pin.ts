import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Board from './board.js'
import User from './user.js'
import Comment from './comment.js'
import Like from './like.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Pin extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare boardId: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare imageUrl: string

  @column()
  declare created_at: Date

  @belongsTo(() => Board)
  declare board: BelongsTo<typeof Board>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>
}
