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
