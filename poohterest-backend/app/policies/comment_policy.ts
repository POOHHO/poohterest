import User from '#models/user'
import Comment from '#models/comment'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './base_policy.js'


export default class CommentPolicy extends AdminBasePolicy {

  index(user: User): AuthorizerResponse {
    return true
  }

  store(user: User): AuthorizerResponse {
    return true
  }

  show(user: User, comment: Comment): AuthorizerResponse {
    return true
  }

  destroy(user: User, comment: Comment): AuthorizerResponse {
    return user.id == comment.userId
  }

}