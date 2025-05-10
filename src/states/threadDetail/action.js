export const ActionType = {
  GET_THREAD_DETAIL: 'GET_THREAD_DETAIL',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRAL_THREAD: 'NEUTRAL_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRAL_COMMENT: 'NEUTRAL_COMMENT',
};

export const receiveThreadDetail = (thread) => ({
  type: ActionType.GET_THREAD_DETAIL,
  payload: { thread },
});

export const upVoteThread = ({ userId }) => ({
  type: ActionType.UPVOTE_THREAD,
  payload: { userId },
});

export const downVoteThread = ({ userId }) => ({
  type: ActionType.DOWNVOTE_THREAD,
  payload: { userId },
});

export const neutralVoteThread = ({ userId }) => ({
  type: ActionType.NEUTRAL_THREAD,
  payload: { userId },
});

// Comment actions
export const createComment = (comment) => ({
  type: ActionType.CREATE_COMMENT,
  payload: comment,
});

export const upVoteComment = ({ commentId, userId }) => ({
  type: ActionType.UPVOTE_COMMENT,
  payload: { commentId, userId },
});

export const downVoteComment = ({ commentId, userId }) => ({
  type: ActionType.DOWNVOTE_COMMENT,
  payload: { commentId, userId },
});

export const neutralVoteComment = ({ commentId, userId }) => ({
  type: ActionType.NEUTRAL_COMMENT,
  payload: { commentId, userId },
});
