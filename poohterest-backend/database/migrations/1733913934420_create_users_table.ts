import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary Key
      table.string('username', 50).unique().notNullable()
      table.string('email', 100).unique().notNullable()
      table.string('password', 255).notNullable()
      table.enum('role',['ADMIN','USER']).notNullable()
      table.string('profile_image', 255).nullable()
      table.text('bio').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}