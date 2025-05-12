/**
 * Test Scenario
 *
 * - Auth Reducer:
 *   1. Should return the initial state when given undefined state
 *      - Arrange: No initial state (undefined)
 *      - Act: Call authReducer with undefined state and empty action
 *      - Assert: Verify default initial state is returned
 *
 *   2. Should handle SET_AUTH_USER action
 *      - Arrange: Initial state with null user and an error
 *      - Act: Call authReducer with SET_AUTH_USER action and user payload
 *      - Assert: Verify user is updated and error is cleared
 *
 *   3. Should handle UNSET_AUTH_USER action
 *      - Arrange: Initial state with a user object
 *      - Act: Call authReducer with UNSET_AUTH_USER action
 *      - Assert: Verify user is set to null
 *
 *   4. Should handle SET_AUTH_ERROR action
 *      - Arrange: Initial state with null error
 *      - Act: Call authReducer with SET_AUTH_ERROR action and error payload
 *      - Assert: Verify error is updated with provided error message
 *
 *   5. Should return current state for unknown action
 *      - Arrange: Current state with user data
 *      - Act: Call authReducer with an unknown action type
 *      - Assert: Verify state is unchanged
 */

import { describe, it, expect } from 'vitest';
import authReducer from './reducer';
import { ActionType } from './actions';

describe('Auth Reducer', () => {
  it('should return the initial state when given undefined state', () => {
    const initialState = {
      user: null,
      error: null,
      isLoading: false,
    };

    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_AUTH_USER action', () => {
    const user = { id: 'user-1', name: 'Test User' };
    const initialState = {
      user: null,
      error: 'Previous error',
      isLoading: false,
    };

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: user,
    };

    const expectedState = {
      user,
      error: null,
      isLoading: false,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UNSET_AUTH_USER action', () => {
    const initialState = {
      user: { id: 'user-1', name: 'Test User' },
      error: null,
      isLoading: false,
    };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const expectedState = {
      user: null,
      error: null,
      isLoading: false,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_AUTH_ERROR action', () => {
    const initialState = {
      user: null,
      error: null,
      isLoading: false,
    };

    const action = {
      type: ActionType.SET_AUTH_ERROR,
      payload: {
        error: 'Invalid credentials',
      },
    };

    const expectedState = {
      user: null,
      error: 'Invalid credentials',
      isLoading: false,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return current state for unknown action', () => {
    const currentState = {
      user: { id: 'user-1' },
      error: null,
      isLoading: false,
    };

    expect(authReducer(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(
      currentState
    );
  });
});
