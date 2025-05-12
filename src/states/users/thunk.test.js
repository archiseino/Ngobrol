/**
 * Test Scenario
 *
 * - Users thunks:
 *   1. Should dispatch action and return users when API call succeeds
 *      - Arrange: Mock successful API response and prepare dispatch
 *      - Act: Call asyncGetAllUsers
 *      - Assert: Verify API called and action dispatched with users data
 *
 *   2. Should handle error when API call fails
 *      - Arrange: Mock API rejection and prepare dispatch
 *      - Act: Call asyncGetAllUsers
 *      - Assert: Verify error handling (alert called)
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import { asyncGetAllUsers } from './thunk';
import api from '../../utils/api';
import { receiveUsers } from './action';

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    getUsers: vi.fn(),
  },
}));

// Mock window.alert
window.alert = vi.fn();

describe('Users thunks', () => {
  let dispatch;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    dispatch = vi.fn();
  });

  describe('asyncGetAllUsers', () => {
    test('should dispatch receiveUsers when API call succeeds', async () => {
      // Arrange
      const users = [
        {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      ];
      api.getUsers.mockResolvedValue(users);

      // Act
      await asyncGetAllUsers()(dispatch);

      // Assert
      expect(api.getUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(receiveUsers(users));
    });

    test('should show alert when API call fails', async () => {
      // Arrange
      const errorMessage = 'Failed to fetch users';
      api.getUsers.mockRejectedValue(new Error(errorMessage));

      // Act
      await asyncGetAllUsers()(dispatch);

      // Assert
      expect(api.getUsers).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
