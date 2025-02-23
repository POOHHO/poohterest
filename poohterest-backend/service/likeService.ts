import Like from "#models/like"

export default class LikeService {

  public static async likePin(pinId: number, userId: number) {

    const existingLike = await Like.query()
      .where('pin_id', pinId)
      .andWhere('user_id', userId)
      .first()

    if (existingLike) {
      throw new Error('You have already liked this pin')
    }

    const like = await Like.create({ pinId, userId })
    return like
  }

  public static async unlikePin(pinId: number, userId: number) {
    const like = await Like.query()
      .where('pin_id', pinId)
      .andWhere('user_id', userId)
      .first()

    if (!like) {
      throw new Error('You have not liked this pin')
    }

    await like.delete()
    return like
  }

  public static async countLikes(pinId: number) {
    const likeCount = await Like.query().where('pin_id', pinId).count('* as total')
    return likeCount[0].$extras.total
  }
}
