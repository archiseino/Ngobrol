import { ActionType } from './action';

const threadDetailReducer = (detailThread = null, action) => {
  switch (action.type) {
    case ActionType.GET_THREAD_DETAIL:
      if (action.payload && action.payload.thread) {
        return action.payload.thread;
      } else if (action.payload) {
        return action.payload;
      }
      return detailThread;
    case ActionType.UPVOTE_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.concat([action.payload.userId]),
        downVotesBy: detailThread.downVotesBy.filter(
          (userId) => userId !== action.payload.userId
        ),
      };
    case ActionType.DOWNVOTE_THREAD:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.concat([action.payload.userId]),
        upVotesBy: detailThread.upVotesBy.filter(
          (userId) => userId !== action.payload.userId
        ),
      };
    case ActionType.NEUTRAL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (userId) => userId !== action.payload.userId
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (userId) => userId !== action.payload.userId
        ),
      };
    case ActionType.CREATE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.concat([action.payload]),
      };
    case ActionType.UPVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.concat([action.payload.userId]),
              downVotesBy: comment.downVotesBy.filter(
                (userId) => userId !== action.payload.userId
              ),
            };
          }
          return comment;
        }),
      };

    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.concat([action.payload.userId]),
              upVotesBy: comment.upVotesBy.filter(
                (userId) => userId !== action.payload.userId
              ),
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRAL_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (userId) => userId !== action.payload.userId
              ),
              downVotesBy: comment.downVotesBy.filter(
                (userId) => userId !== action.payload.userId
              ),
            };
          }
          return comment;
        }),
      };
    default:
      return detailThread;
  }
};

export default threadDetailReducer;
