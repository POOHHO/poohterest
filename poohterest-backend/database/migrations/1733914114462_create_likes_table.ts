import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Likes extends BaseSchema {
  protected tableName = 'likes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary Key
      table.integer('pin_id').unsigned().references('id').inTable('pins').onDelete('CASCADE') // Foreign Key
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // Foreign Key
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}