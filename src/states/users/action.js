const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsers(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

export { ActionType, receiveUsers };
