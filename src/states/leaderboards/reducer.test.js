/**
 * Test Scenario
 *
 * - Leaderboards reducer:
 *   1. Should return the initial state when no action is provided
 *      - Arrange: No initial state (undefined)
 *      - Act: Call reducer with undefined state and empty action
 *      - Assert: Verify initial state is an empty array
 *
 *   2. Should handle RECEIVE_LEADERBOARDS action correctly
 *      - Arrange: Initial state (empty array) and sample leaderboard data
 *      - Act: Call reducer with RECEIVE_LEADERBOARDS action containing leaderboard data
 *      - Assert: Verify state contains the leaderboard data
 */

import { describe, test, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('leaderboards reducer', () => {
  test('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = [];

    // Act
    const nextState = usersReducer(undefined, {});

    // Assert
    expect(nextState).toEqual(initialState);
  });

  test('should handle RECEIVE_LEADERBOARDS action correctly', () => {
    // Arrange
    const initialState = [];
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

    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards,
      },
    };

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(leaderboards);
  });

  test('should return current state for unknown action', () => {
    // Arrange
    const currentState = [
      {
        user: {
          id: 'user-1',
          name: 'John Doe',
        },
        score: 100,
      },
    ];

    // Act
    const nextState = usersReducer(currentState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(nextState).toEqual(currentState);
  });
});
