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
