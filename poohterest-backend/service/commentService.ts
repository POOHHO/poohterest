import Comment from "#models/comment";

export default class CommentService {
  public static async createComment(data: { pinId: number; userId: number; comment: string }) {
    const newComment = await Comment.create(data)
    return newComment
  }

  public static async getCommentsForPin(pinId: number) {
    const comments = await Comment.query()
      .where('pin_id', pinId)
      .preload('user') 
      .preload('pin')  
    return comments
  }

}