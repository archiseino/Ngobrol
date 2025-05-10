import api from '../../utils/api';
import { receiveLeaderboards } from './action';

const asycnGetAllLeaderboards = () => {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
};

export { asycnGetAllLeaderboards };
