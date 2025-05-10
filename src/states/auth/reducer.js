import { ActionType } from './actions';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case ActionType.UNSET_AUTH_USER:
      return {
        ...state,
        user: null,
      };
    case ActionType.SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
