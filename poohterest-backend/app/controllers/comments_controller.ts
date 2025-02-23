import type { HttpContext } from '@adonisjs/core/http'
import CommentService from '../../service/commentService.js'
import Comment from '#models/comment'

export default class CommentsController {
  public async index({ params, response }: HttpContext) {
    const comments = await CommentService.getCommentsForPin(params.pin_id)
    return response.ok({ comments })
  }

  public async store({ request, auth, response, bouncer }: HttpContext) {
    const user = auth.getUserOrFail()
    await bouncer.with('CommentPolicy').authorize('store')
    const data = request.only(['comment', 'pinId'])
    const newComment = await CommentService.createComment({
      comment: data.comment,
      pinId: data.pinId,
      userId: user.id,
    })

    return response.created({ newComment })
  }

  public async destroy({ params, response, bouncer }: HttpContext) {
    try {
      console.log(params.id);
      
      const comment = await Comment.findOrFail(params.id)
      await bouncer.with('CommentPolicy').authorize('destroy', comment)
      await comment.delete()
      return response.ok('delete successful')
    } catch (error) {
      console.log(error);
      return response.badRequest( error.message )
      
    }
  }


}