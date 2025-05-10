import { ActionType } from './action';

const preloadReducer = (state = true, action) => {
  switch (action.type) {
    case ActionType.SET_PRELOAD:
      return action.payload.value;
    default:
      return state;
  }
};

export default preloadReducer;
