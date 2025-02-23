import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Pins extends BaseSchema {
  protected tableName = 'pins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary Key
      table.integer('board_id').unsigned().references('id').inTable('boards').onDelete('CASCADE') // Foreign Key
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // Foreign Key
      table.string('title', 100).nullable()
      table.text('description').nullable()
      table.string('image_url', 255).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}