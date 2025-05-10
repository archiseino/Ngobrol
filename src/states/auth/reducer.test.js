import { describe, test, expect } from 'vitest';
import authReducer from './reducer';
import { ActionType } from './actions';

describe('authReducer', () => {
  test('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = {
      user: null,
      error: null,
      isLoading: false,
    };

    // Act
    const nextState = authReducer(undefined, {});

    // Assert
    expect(nextState).toEqual(initialState);
  });

  test('should handle SET_AUTH_USER action correctly', () => {
    // Arrange
    const initialState = {
      user: null,
      error: 'Some previous error',
      isLoading: false,
    };

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    };

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      user: action.payload,
      error: null,
    });
  });

  test('should handle UNSET_AUTH_USER action correctly', () => {
    // Arrange
    const initialState = {
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
      error: null,
      isLoading: false,
    };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      user: null,
    });
  });

  test('should handle SET_AUTH_ERROR action correctly', () => {
    // Arrange
    const initialState = {
      user: null,
      error: null,
      isLoading: false,
    };

    const errorMessage = 'Invalid credentials';
    const action = {
      type: ActionType.SET_AUTH_ERROR,
      payload: {
        error: errorMessage,
      },
    };

    // Act
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });
});
