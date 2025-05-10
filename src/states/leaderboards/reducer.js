import { ActionType } from './action';

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return users;
  }
};

export default usersReducer;
