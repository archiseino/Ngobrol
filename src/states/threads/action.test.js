/**
 * Test Scenario
 *
 * - Threads actions:
 *   1. receiveThreads:
 *      - Should create an action to receive threads
 *        - Arrange: Create sample threads data
 *        - Act: Call receiveThreads with threads data
 *        - Assert: Verify correct action type and payload
 *
 *   2. addThread:
 *      - Should create an action to add a thread
 *        - Arrange: Create a sample thread
 *        - Act: Call addThread with thread data
 *        - Assert: Verify correct action type and payload
 *
 *   3. toggleUpVote:
 *      - Should create an action to toggle upvote on a thread
 *        - Arrange: Prepare thread ID and user ID
 *        - Act: Call toggleUpVote with IDs
 *        - Assert: Verify correct action type and payload
 *
 *   4. toggleDownVote:
 *      - Should create an action to toggle downvote on a thread
 *        - Arrange: Prepare thread ID and user ID
 *        - Act: Call toggleDownVote with IDs
 *        - Assert: Verify correct action type and payload
 *
 *   5. toggleNeutralVote:
 *      - Should create an action to neutralize vote on a thread
 *        - Arrange: Prepare thread ID and user ID
 *        - Act: Call toggleNeutralVote with IDs
 *        - Assert: Verify correct action type and payload
 */

import { describe, test, expect } from 'vitest';
import {
  ActionType,
  receiveThreads,
  addThread,
  toggleUpVote,
  toggleDownVote,
  toggleNeutralVote,
} from './action';

describe('Threads actions', () => {
  describe('receiveThreads', () => {
    test('should create an action to receive threads', () => {
      // Arrange
      const threads = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          body: 'Thread body content 1',
          category: 'general',
          createdAt: '2023-05-10T07:00:00.000Z',
          ownerId: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
        {
          id: 'thread-2',
          title: 'Thread Title 2',
          body: 'Thread body content 2',
          category: 'react',
          createdAt: '2023-05-10T08:00:00.000Z',
          ownerId: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ];

      // Act
      const action = receiveThreads(threads);

      // Assert
      expect(action).toEqual({
        type: ActionType.RECEIVE_THREADS,
        payload: { threads },
      });
    });
  });

  describe('addThread', () => {
    test('should create an action to add a thread', () => {
      // Arrange
      const thread = {
        id: 'thread-1',
        title: 'Thread Title',
        body: 'Thread body content',
        category: 'general',
        createdAt: '2023-05-10T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      };

      // Act
      const action = addThread(thread);

      // Assert
      expect(action).toEqual({
        type: ActionType.ADD_THREAD,
        payload: { thread },
      });
    });
  });

  describe('voting actions', () => {
    test('should create an action for toggling upvote', () => {
      // Arrange
      const threadId = 'thread-1';
      const authUser = 'user-1';

      // Act
      const action = toggleUpVote({ threadId, authUser });

      // Assert
      expect(action).toEqual({
        type: ActionType.TOGGLE_UP_VOTE_THREAD,
        payload: { threadId, authUser },
      });
    });

    test('should create an action for toggling downvote', () => {
      // Arrange
      const threadId = 'thread-1';
      const authUser = 'user-1';

      // Act
      const action = toggleDownVote({ threadId, authUser });

      // Assert
      expect(action).toEqual({
        type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
        payload: { threadId, authUser },
      });
    });

    test('should create an action for toggling neutral vote', () => {
      // Arrange
      const threadId = 'thread-1';
      const authUser = 'user-1';

      // Act
      const action = toggleNeutralVote({ threadId, authUser });

      // Assert
      expect(action).toEqual({
        type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
        payload: { threadId, authUser },
      });
    });
  });
});
