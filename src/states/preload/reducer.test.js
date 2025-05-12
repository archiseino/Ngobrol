/**
 * Test Scenario
 *
 * - preloadReducer:
 *   1. Should return the initial state when no action is provided
 *      - Arrange: No initial state (undefined)
 *      - Act: Call reducer with undefined state and empty action
 *      - Assert: Verify initial state is true
 *
 *   2. Should handle SET_PRELOAD action correctly when set to false
 *      - Arrange: Initial state is true
 *      - Act: Call reducer with SET_PRELOAD action and false payload
 *      - Assert: Verify state is updated to false
 *
 *   3. Should handle SET_PRELOAD action correctly when set to true
 *      - Arrange: Initial state is false
 *      - Act: Call reducer with SET_PRELOAD action and true payload
 *      - Assert: Verify state is updated to true
 */

import { describe, test, expect } from 'vitest';
import preloadReducer from './reducer';
import { ActionType } from './action';

describe('preloadReducer', () => {
  test('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = true;

    // Act
    const nextState = preloadReducer(undefined, {});

    // Assert
    expect(nextState).toEqual(initialState);
  });

  test('should handle SET_PRELOAD action with true value', () => {
    // Arrange
    const initialState = false;
    const action = {
      type: ActionType.SET_PRELOAD,
      payload: {
        value: true,
      },
    };

    // Act
    const nextState = preloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(true);
  });

  test('should handle SET_PRELOAD action with false value', () => {
    // Arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_PRELOAD,
      payload: {
        value: false,
      },
    };

    // Act
    const nextState = preloadReducer(initialState, action);

    // Assert
    expect(nextState).toBe(false);
  });

  test('should return current state for unknown action', () => {
    // Arrange
    const currentState = true;

    // Act
    const nextState = preloadReducer(currentState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(nextState).toBe(currentState);
  });
});
