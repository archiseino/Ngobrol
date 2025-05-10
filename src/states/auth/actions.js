const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
  SET_AUTH_ERROR: 'SET_AUTH_ERROR',
};

const setAuthUser = (user) => ({
  type: ActionType.SET_AUTH_USER,
  payload: user,
});

const unsetAuthUser = () => ({
  type: ActionType.UNSET_AUTH_USER,
});

const setAuthError = (errorMessage) => ({
  type: ActionType.SET_AUTH_ERROR,
  payload: {
    error: errorMessage,
  },
});

export { ActionType, setAuthUser, unsetAuthUser, setAuthError };
