import { describe, test, expect } from 'vitest';
import { ActionType, receiveUsers } from './action';

describe('Users actions', () => {
  describe('receiveUsers', () => {
    test('should create an action to receive users', () => {
      // Arrange
      const users = [
        {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg'
        }
      ];
      
      // Act
      const action = receiveUsers(users);

      // Assert
      expect(action).toEqual({
        type: ActionType.RECEIVE_USERS,
        payload: {
          users
        }
      });
    });
  });
});
