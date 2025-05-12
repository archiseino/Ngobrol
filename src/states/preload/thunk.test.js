/**
 * Test Scenario
 *
 * - asyncPreloadProcess thunk:
 *   1. Should authenticate user when valid token exists
 *      - Arrange: Mock valid token and successful profile fetch
 *      - Act: Call asyncPreloadProcess thunk
 *      - Assert: Verify loading actions, user authenticated, and preload state set to false
 *
 *   2. Should handle no token available
 *      - Arrange: Mock no token available
 *      - Act: Call asyncPreloadProcess thunk
 *      - Assert: Verify preload state set to false
 *
 *   3. Should handle token validation failure
 *      - Arrange: Mock token exists but profile fetch fails
 *      - Act: Call asyncPreloadProcess thunk
 *      - Assert: Verify token cleared and preload state set to false
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { asyncPreloadProcess } from './thunk';
import api from '../../utils/api';
import { setPreload } from './action';
import { setAuthUser } from '../auth/actions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Mock dependencies
vi.mock('../../utils/api', () => ({
  default: {
    getAccessToken: vi.fn(),
    getProfile: vi.fn(),
    putAccessToken: vi.fn(),
  },
}));

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

vi.mock('../auth/actions', () => ({
  setAuthUser: vi.fn((user) => ({ type: 'SET_AUTH_USER', payload: user })),
}));

vi.mock('./action', () => ({
  setPreload: vi.fn((value) => ({ type: 'SET_PRELOAD', payload: { value } })),
}));

describe('Preload thunks', () => {
  let dispatch;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    dispatch = vi.fn();
  });

  describe('asyncPreloadProcess', () => {
    test('should handle case when token exists and profile is successfully fetched', async () => {
      // Arrange
      const token = 'valid-token';
      const userProfile = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      api.getAccessToken.mockReturnValue(token);
      api.getProfile.mockResolvedValue(userProfile);

      // Act
      await asyncPreloadProcess()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAccessToken).toHaveBeenCalled();
      expect(api.getProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(userProfile));
      expect(dispatch).toHaveBeenCalledWith(setPreload(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(api.putAccessToken).not.toHaveBeenCalled();
    });

    test('should handle case when token exists but profile fetch fails', async () => {
      // Arrange
      const token = 'invalid-token';
      const error = new Error('Invalid token');

      api.getAccessToken.mockReturnValue(token);
      api.getProfile.mockRejectedValue(error);

      // Act and Assert
      await expect(asyncPreloadProcess()(dispatch)).rejects.toThrow(
        'Invalid token'
      );

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAccessToken).toHaveBeenCalled();
      expect(api.getProfile).toHaveBeenCalled();
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(null));
      expect(dispatch).toHaveBeenCalledWith(setPreload(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    test('should handle case when no token exists', async () => {
      // Arrange
      api.getAccessToken.mockReturnValue('');

      // Act
      await asyncPreloadProcess()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getAccessToken).toHaveBeenCalled();
      expect(api.getProfile).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(null));
      expect(dispatch).toHaveBeenCalledWith(setPreload(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    test('should always set preload to false even when unexpected errors occur', async () => {
      // Arrange
      const unexpectedError = new Error('Unexpected error');
      api.getAccessToken.mockImplementation(() => {
        throw unexpectedError;
      });

      // Act and Assert
      await expect(asyncPreloadProcess()(dispatch)).rejects.toThrow(
        'Invalid token'
      );

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(null));
      expect(dispatch).toHaveBeenCalledWith(setPreload(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
