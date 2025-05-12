/**
 * Test Scenario
 *
 * - Preload actions:
 *   1. Should create an action to set preload state to true
 *      - Arrange: Set value to true
 *      - Act: Call setPreload action creator with true
 *      - Assert: Verify correct action type and payload
 *
 *   2. Should create an action to set preload state to false
 *      - Arrange: Set value to false
 *      - Act: Call setPreload action creator with false
 *      - Assert: Verify correct action type and payload
 */

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
