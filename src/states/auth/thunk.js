import api from '../../utils/api';
import { setAuthUser, unsetAuthUser, setAuthError } from './actions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Method to handle user registration
const asyncRegisterUser = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // Register the user
      const user = await api.registerUser({ name, email, password });

      // Registration successful
      return user;
    } catch (error) {
      // Handle registration errors
      dispatch(setAuthError(error.message || 'Registration failed'));
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
};

// Method to handle user login
const asyncLoginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // Login the user and get token
      await api.loginUser({ email, password });

      // Fetch the user profile
      const user = await api.getProfile();

      // Update the state with the user profile
      dispatch(setAuthUser(user));

      // Return the user profile
      return user;
    } catch (error) {
      // Handle login errors
      dispatch(setAuthError(error.message || 'Login failed'));
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
};

// Method to handle user logout
const asyncLogoutUser = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // Clear the user from the state
      dispatch(unsetAuthUser());

      // Remove the access token
      api.putAccessToken('');

      // Clear any remembered credentials if needed
      localStorage.removeItem('rememberedEmail');

      return true;
    } catch (error) {
      throw new Error('Logout failed', error);
    } finally {
      dispatch(hideLoading());
    }
  };
};

// Method to check if user is already authenticated
const asyncCheckAuthUser = () => {
  return async (dispatch) => {
    try {
      // Check if we have a token
      const token = api.getAccessToken();

      if (!token) {
        // No token, user is not authenticated
        dispatch(unsetAuthUser());
        return null;
      }

      // Token exists, fetch user profile
      const user = await api.getProfile();

      if (user) {
        // User authenticated, update state
        dispatch(setAuthUser(user));
        return user;
      } else {
        // Invalid token or user profile
        api.putAccessToken('');
        dispatch(unsetAuthUser());
        return null;
      }
    } catch (error) {
      // Error fetching user profile, clear auth state
      api.putAccessToken('');
      dispatch(unsetAuthUser());
      throw new Error('Failed to check authentication status', error);
    }
  };
};

export {
  asyncRegisterUser,
  asyncLoginUser,
  asyncLogoutUser,
  asyncCheckAuthUser,
};
