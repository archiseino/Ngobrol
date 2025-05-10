import { describe, test, expect, vi, beforeEach, afterAll } from 'vitest';
import { asycnGetAllLeaderboards } from './thunk';
import api from '../../utils/api';
import { receiveLeaderboards } from './action';

// Mock the API module
vi.mock('../../utils/api', () => ({
  default: {
    getLeaderboards: vi.fn(),
  },
}));

// Mock window.alert
const originalAlert = window.alert;
window.alert = vi.fn();

// Restore original alert after tests
afterAll(() => {
  window.alert = originalAlert;
});

describe('Leaderboards thunks', () => {
  let dispatch;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    dispatch = vi.fn();
  });

  describe('asycnGetAllLeaderboards', () => {
    test('should dispatch receiveLeaderboards with the leaderboards data when API call succeeds', async () => {
      // Arrange
      const leaderboards = [
        {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 100,
        },
        {
          user: {
            id: 'user-2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 85,
        },
      ];

      api.getLeaderboards.mockResolvedValue(leaderboards);

      // Act
      await asycnGetAllLeaderboards()(dispatch);

      // Assert
      expect(api.getLeaderboards).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(receiveLeaderboards(leaderboards));
    });

    test('should show alert when API call fails', async () => {
      // Arrange
      const errorMessage = 'Failed to fetch leaderboards';
      api.getLeaderboards.mockRejectedValue(new Error(errorMessage));

      // Act
      await asycnGetAllLeaderboards()(dispatch);

      // Assert
      expect(api.getLeaderboards).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
