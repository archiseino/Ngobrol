import api from '../../utils/api';
import { receiveThreads } from './action';
import { toggleUpVote, toggleDownVote, toggleNeutralVote } from './action';

const asyncGetAllThreads = () => {
  return async (dispatch) => {
    try {
      const threads = await api.getThreads();
      dispatch(receiveThreads(threads));
    } catch (error) {
      alert(error.message);
    }
  };
};

const asyncCreateThread = ({ title, body, category }) => {
  return async () => {
    try {
      await api.createThread({ title, body, category });
    } catch (error) {
      alert(error.message);
    }
  };
};

function asyncToggleUpVote({ threadId }) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user; // Fix: access user instead of authUser

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(toggleUpVote({ threadId, authUser: authUser.id }));

    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralVote({ threadId, authUser: authUser.id }));
    }
  };
}

function asyncToggleDownVote({ threadId }) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user; // Fix: access user instead of authUser

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(toggleDownVote({ threadId, authUser: authUser.id }));

    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralVote({ threadId, authUser: authUser.id }));
    }
  };
}

function asyncNeutralizeUpVote({ threadId }) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user; // Fix: access user instead of authUser

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(toggleNeutralVote({ threadId, authUser: authUser.id }));

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVote({ threadId, authUser: authUser.id }));
    }
  };
}

function asyncNeutralizeDownVote({ threadId }) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const authUser = auth?.user; // Fix: access user instead of authUser

    if (!authUser) return; // Don't proceed if not logged in

    dispatch(toggleNeutralVote({ threadId, authUser: authUser.id }));

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVote({ threadId, authUser: authUser.id }));
    }
  };
}

export {
  asyncGetAllThreads,
  asyncCreateThread,
  asyncToggleUpVote,
  asyncToggleDownVote,
  asyncNeutralizeUpVote,
  asyncNeutralizeDownVote,
};
