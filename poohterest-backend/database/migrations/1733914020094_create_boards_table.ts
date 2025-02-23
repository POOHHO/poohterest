import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Boards extends BaseSchema {
  protected tableName = 'boards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary Key
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE') // Foreign Key
      table.string('name', 100).notNullable()
      table.text('description').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}