import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../contact/role.js'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      { username: 'admin', password: 'admin', email: 'admin',role: Role.ADMIN },
      { username: 'pooh', password: '123456', email: 'patchara.phol@hotmail.com', role: Role.USER },
    ]) 
  }
}