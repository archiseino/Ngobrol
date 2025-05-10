import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setAuthUser } from '../auth/actions';
import { setPreload } from './action';

const asyncPreloadProcess = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const token = api.getAccessToken();

      if (token) {
        try {
          const authUser = await api.getProfile();
          dispatch(setAuthUser(authUser));
        } catch (error) {
          api.putAccessToken('');
          dispatch(setAuthUser(null));
          throw new Error('Invalid token', error);
        }
      } else {
        // No token found
        dispatch(setAuthUser(null));
      }
    } catch (error) {
      // Handle unexpected errors
      dispatch(setAuthUser(null));
      throw new Error('Invalid token', error);
    } finally {
      // End preload process
      dispatch(setPreload(false));
      dispatch(hideLoading());
    }
  };
};

export { asyncPreloadProcess };
