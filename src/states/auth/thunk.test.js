import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  asyncRegisterUser,
  asyncLoginUser,
  asyncLogoutUser,
  asyncCheckAuthUser,
} from './thunk';
import api from '../../utils/api';
import { setAuthUser, unsetAuthUser, setAuthError } from './actions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Mock API and other dependencies
vi.mock('../../utils/api', () => ({
  default: {
    registerUser: vi.fn(),
    loginUser: vi.fn(),
    getProfile: vi.fn(),
    putAccessToken: vi.fn(),
    getAccessToken: vi.fn(),
  },
}));

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key]),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Auth thunks', () => {
  let dispatch;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    dispatch = vi.fn();
  });

  describe('asyncRegisterUser', () => {
    test('should dispatch actions correctly when registration succeeds', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const expectedUser = {
        id: 'user-1',
        name: userData.name,
        email: userData.email,
      };

      api.registerUser.mockResolvedValue(expectedUser);

      // Act
      const result = await asyncRegisterUser(userData)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.registerUser).toHaveBeenCalledWith(userData);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual(expectedUser);
    });

    test('should dispatch error action when registration fails', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const errorMessage = 'Email already in use';
      api.registerUser.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(asyncRegisterUser(userData)(dispatch)).rejects.toThrow(
        errorMessage
      );
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthError(errorMessage));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncLoginUser', () => {
    test('should dispatch actions correctly when login succeeds', async () => {
      // Arrange
      const loginData = {
        email: 'john@example.com',
        password: 'password123',
      };

      const expectedUser = {
        id: 'user-1',
        name: 'John Doe',
        email: loginData.email,
      };

      api.loginUser.mockResolvedValue({ token: 'fake-token' });
      api.getProfile.mockResolvedValue(expectedUser);

      // Act
      const result = await asyncLoginUser(loginData)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.loginUser).toHaveBeenCalledWith(loginData);
      expect(api.getProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(expectedUser));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toEqual(expectedUser);
    });

    test('should dispatch error action when login fails', async () => {
      // Arrange
      const loginData = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      const errorMessage = 'Invalid credentials';
      api.loginUser.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(asyncLoginUser(loginData)(dispatch)).rejects.toThrow(
        errorMessage
      );
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthError(errorMessage));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncLogoutUser', () => {
    test('should dispatch actions correctly during logout', async () => {
      // Act
      await asyncLogoutUser()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUser());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'rememberedEmail'
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncCheckAuthUser', () => {
    test('should return user and dispatch setAuthUser when token is valid', async () => {
      // Arrange
      const expectedUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      api.getAccessToken.mockReturnValue('valid-token');
      api.getProfile.mockResolvedValue(expectedUser);

      // Act
      const result = await asyncCheckAuthUser()(dispatch);

      // Assert
      expect(api.getAccessToken).toHaveBeenCalled();
      expect(api.getProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(expectedUser));
      expect(result).toEqual(expectedUser);
    });

    test('should dispatch unsetAuthUser when no token exists', async () => {
      // Arrange
      api.getAccessToken.mockReturnValue('');

      // Act
      const result = await asyncCheckAuthUser()(dispatch);

      // Assert
      expect(api.getAccessToken).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUser());
      expect(result).toBeNull();
    });

    test('should handle error during profile fetch', async () => {
      // Arrange
      api.getAccessToken.mockReturnValue('invalid-token');
      api.getProfile.mockRejectedValue(new Error('Failed to fetch profile'));

      // Act & Assert
      await expect(asyncCheckAuthUser()(dispatch)).rejects.toThrow(
        'Failed to check authentication status'
      );
      expect(api.getAccessToken).toHaveBeenCalled();
      expect(api.getProfile).toHaveBeenCalled();
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUser());
    });
  });
});
