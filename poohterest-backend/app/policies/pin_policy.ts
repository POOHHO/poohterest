import User from '#models/user'
import Pin from '#models/pin'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './base_policy.js'


export default class PinPolicy extends AdminBasePolicy {

  index(user: User): AuthorizerResponse {
    return true
  }

  store(user: User): AuthorizerResponse {
    return true
  }

  show(user: User, pin: Pin): AuthorizerResponse {
    return true
  }

  destroy(user: User, pin: Pin): AuthorizerResponse {
    return user.id == pin.userId
  }

}