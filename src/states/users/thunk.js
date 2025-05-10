import api from '../../utils/api';
import { receiveUsers } from './action';

const asyncGetAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await api.getUsers();
      dispatch(receiveUsers(users));
    } catch (error) {
      alert(error.message);
    }
  };
};

export { asyncGetAllUsers };
