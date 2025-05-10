import api from '../../utils/api';
import {
  receiveThreadDetail,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
} from './action';

const asyncGetThreadDetail = (threadId) => {
  return async (dispatch) => {
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      console.log('API Response for thread detail:', threadDetail);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      console.error('Error fetching thread detail:', error);
      alert(error.message);
    }
  };
};

const asyncUpVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(upVoteThread({ userId: authUser.id }));
    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteThread({ userId: authUser.id }));
    }
  };
};

const asyncDownVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(downVoteThread({ userId: authUser.id }));
    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteThread({ userId: authUser.id }));
    }
  };
};

const asyncNeutralVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(neutralVoteThread({ userId: authUser.id }));
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
};

// Comment section
const asyncAddComment = (threadId, content) => {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ id: threadId, content });
      dispatch(createComment(comment));
    } catch (error) {
      alert(error.message);
    }
  };
};

const asyncUpvoteComment = (threadId, commentId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(upVoteComment({ commentId, userId: authUser.id }));
    try {
      await api.upvoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteComment({ commentId, userId: authUser.id }));
    }
  };
};

const asyncDownvoteComment = (threadId, commentId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(downVoteComment({ commentId, userId: authUser.id }));
    try {
      await api.downvoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(neutralVoteComment({ commentId, userId: authUser.id }));
    }
  };
};

const asyncNeutralUpVoteComment = (threadId, commentId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(neutralVoteComment({ commentId, userId: authUser.id }));
    try {
      await api.neutralizeVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(upVoteComment({ commentId, userId: authUser.id }));
    }
  };
};

const asyncNeutralDownVoteComment = (threadId, commentId) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user;

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(neutralVoteComment({ commentId, userId: authUser.id }));
    try {
      await api.neutralizeVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(downVoteComment({ commentId, userId: authUser.id }));
    }
  };
};

export {
  asyncGetThreadDetail,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncAddComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralUpVoteComment,
  asyncNeutralDownVoteComment,
};
