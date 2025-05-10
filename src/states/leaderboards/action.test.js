import { describe, test, expect } from 'vitest';
import { ActionType, receiveLeaderboards } from './action';

describe('Leaderboards actions', () => {
  describe('receiveLeaderboards', () => {
    test('should create an action to receive leaderboards', () => {
      // Arrange
      const leaderboards = [
        {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
          score: 100,
        },
        {
          user: {
            id: 'user-2',
            name: 'Jane Smith',
            email: 'jane@example.com',
          },
          score: 85,
        },
      ];

      // Act
      const action = receiveLeaderboards(leaderboards);

      // Assert
      expect(action).toEqual({
        type: ActionType.RECEIVE_LEADERBOARDS,
        payload: {
          leaderboards,
        },
      });
    });
  });
});
