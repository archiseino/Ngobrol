import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;

    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];

    case ActionType.TOGGLE_UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.authUser)
              ? thread.upVotesBy.filter((id) => id !== action.payload.authUser)
              : [...thread.upVotesBy, action.payload.authUser],
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.authUser
            ),
          };
        }
        return thread;
      });

    case ActionType.TOGGLE_DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.authUser
            ),
            downVotesBy: thread.downVotesBy.includes(action.payload.authUser)
              ? thread.downVotesBy.filter(
                  (id) => id !== action.payload.authUser
                )
              : [...thread.downVotesBy, action.payload.authUser],
          };
        }
        return thread;
      });

    case ActionType.TOGGLE_NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.authUser
            ),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.authUser
            ),
          };
        }
        return thread;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
