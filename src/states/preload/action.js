const ActionType = {
  SET_PRELOAD: 'SET_PRELOAD',
};

function setPreload(value) {
  return {
    type: ActionType.SET_PRELOAD,
    payload: {
      value,
    },
  };
}

export { ActionType, setPreload };
