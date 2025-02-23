import type { HttpContext } from '@adonisjs/core/http'
import LikeService from '../../service/likeService.js'

export default class LikesController {

  public async store({ params, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'Please log in to like a pin.' })
    }

    try {
      const like = await LikeService.likePin(params.pin_id, user.id)
      return response.created({ like })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'Please log in to unlike a pin.' })
    }

    try {
      await LikeService.unlikePin(params.pin_id, user.id)
      return response.noContent()
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async count({ params, response }: HttpContext) {
    const totalLikes = await LikeService.countLikes(params.pin_id)
    return response.ok({ totalLikes })
  }
}
