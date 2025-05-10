import { describe, test, expect } from 'vitest';
import { ActionType, setPreload } from './action';

describe('Preload actions', () => {
  describe('setPreload', () => {
    test('should create an action to set preload state to true', () => {
      // Arrange
      const value = true;
      
      // Act
      const action = setPreload(value);

      // Assert
      expect(action).toEqual({
        type: ActionType.SET_PRELOAD,
        payload: {
          value,
        },
      });
    });

    test('should create an action to set preload state to false', () => {
      // Arrange
      const value = false;
      
      // Act
      const action = setPreload(value);

      // Assert
      expect(action).toEqual({
        type: ActionType.SET_PRELOAD,
        payload: {
          value,
        },
      });
    });
  });
});
