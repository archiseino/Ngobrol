/**
 * Test Scenario
 *
 * - usersReducer:
 *   1. Should return the initial state when no action is provided
 *      - Arrange: Expect initial state to be empty array
 *      - Act: Call reducer with undefined state and empty action
 *      - Assert: Verify empty array is returned
 *
 *   2. Should handle RECEIVE_USERS action correctly
 *      - Arrange: Create sample users and initial state
 *      - Act: Call reducer with RECEIVE_USERS action
 *      - Assert: Verify users are stored in state
 */

import { describe, test, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {
  test('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = [];

    // Act
    const nextState = usersReducer(undefined, {});

    // Assert
    expect(nextState).toEqual(initialState);
  });

  test('should handle RECEIVE_USERS action', () => {
    // Arrange
    const initialState = [];
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
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users },
    };

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(users);
  });

  test('should replace existing users when RECEIVE_USERS action is dispatched', () => {
    // Arrange
    const initialState = [
      {
        id: 'user-1',
        name: 'Old User',
      },
    ];
    const newUsers = [
      {
        id: 'user-2',
        name: 'New User',
      },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users: newUsers },
    };

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(newUsers);
  });

  test('should return current state for unknown action', () => {
    // Arrange
    const currentState = [
      {
        id: 'user-1',
        name: 'John Doe',
      },
    ];

    // Act
    const nextState = usersReducer(currentState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(nextState).toBe(currentState);
  });
});
