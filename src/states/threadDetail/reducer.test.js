/**
 * Test Scenario
 *
 * - threadDetailReducer:
 *   1. Should return null when no action is provided and initial state is undefined
 *      - Act: Call reducer with undefined state and empty action
 *      - Assert: Verify null is returned
 *
 *   2. Thread detail fetching:
 *      - Should handle GET_THREAD_DETAIL action with thread in payload
 *        - Arrange: Create thread detail data
 *        - Act: Call reducer with GET_THREAD_DETAIL action
 *        - Assert: Verify state contains thread detail
 *
 *   3. Thread voting:
 *      - Should handle UP_VOTE_THREAD action when user has not voted
 *        - Arrange: Set up thread detail with user not in upVotesBy
 *        - Act: Call reducer with UP_VOTE_THREAD action
 *        - Assert: Verify user added to upVotesBy
 *
 *      - Should handle UP_VOTE_THREAD action when user has downvoted
 *        - Arrange: Set up thread detail with user in downVotesBy
 *        - Act: Call reducer with UP_VOTE_THREAD action
 *        - Assert: Verify user removed from downVotesBy and added to upVotesBy
 *
 *      - Should handle DOWN_VOTE_THREAD action when user has not voted
 *        - Arrange: Set up thread detail with user not in downVotesBy
 *        - Act: Call reducer with DOWN_VOTE_THREAD action
 *        - Assert: Verify user added to downVotesBy
 *
 *      - Should handle DOWN_VOTE_THREAD action when user has upvoted
 *        - Arrange: Set up thread detail with user in upVotesBy
 *        - Act: Call reducer with DOWN_VOTE_THREAD action
 *        - Assert: Verify user removed from upVotesBy and added to downVotesBy
 *
 *      - Should handle NEUTRAL_VOTE_THREAD action when user has upvoted
 *        - Arrange: Set up thread detail with user in upVotesBy
 *        - Act: Call reducer with NEUTRAL_VOTE_THREAD action
 *        - Assert: Verify user removed from upVotesBy
 *
 *      - Should handle NEUTRAL_VOTE_THREAD action when user has downvoted
 *        - Arrange: Set up thread detail with user in downVotesBy
 *        - Act: Call reducer with NEUTRAL_VOTE_THREAD action
 *        - Assert: Verify user removed from downVotesBy
 *
 *   4. Comment operations:
 *      - Should handle CREATE_COMMENT action
 *        - Arrange: Set up thread detail with comments
 *        - Act: Call reducer with CREATE_COMMENT action containing new comment
 *        - Assert: Verify new comment added to comments array
 *
 *      - Should handle UP_VOTE_COMMENT action for existing comment
 *        - Arrange: Set up thread detail with comments
 *        - Act: Call reducer with UP_VOTE_COMMENT action
 *        - Assert: Verify upvote added to correct comment
 *
 *      - Should handle DOWN_VOTE_COMMENT action for existing comment
 *        - Arrange: Set up thread detail with comments
 *        - Act: Call reducer with DOWN_VOTE_COMMENT action
 *        - Assert: Verify downvote added to correct comment
 *
 *      - Should handle NEUTRAL_VOTE_COMMENT action for existing comment
 *        - Arrange: Set up thread detail with comments
 *        - Act: Call reducer with NEUTRAL_VOTE_COMMENT action
 *        - Assert: Verify vote removed from correct comment
 */

import { describe, test, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
  test('should return null when no action is provided and initial state is undefined', () => {
    // Act
    const nextState = threadDetailReducer(undefined, {});

    // Assert
    expect(nextState).toBeNull();
  });

  describe('Thread detail fetching', () => {
    test('should handle GET_THREAD_DETAIL action with thread in payload', () => {
      // Arrange
      const initialState = null;
      const thread = {
        id: 'thread-1',
        title: 'Thread Title',
        body: 'Thread body content',
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      };
      const action = {
        type: ActionType.GET_THREAD_DETAIL,
        payload: { thread },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState).toEqual(thread);
    });

    test('should handle GET_THREAD_DETAIL action with direct payload', () => {
      // Arrange
      const initialState = null;
      const thread = {
        id: 'thread-1',
        title: 'Thread Title',
      };
      const action = {
        type: ActionType.GET_THREAD_DETAIL,
        payload: thread,
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState).toEqual(thread);
    });
  });

  describe('Thread voting', () => {
    test('should handle UPVOTE_THREAD action when user has not voted', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      };
      const action = {
        type: ActionType.UPVOTE_THREAD,
        payload: { userId: 'user-1' },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.upVotesBy).toContain('user-1');
      expect(nextState.downVotesBy).not.toContain('user-1');
    });

    test('should handle UPVOTE_THREAD action when user has downvoted', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: ['user-1'],
        comments: [],
      };
      const action = {
        type: ActionType.UPVOTE_THREAD,
        payload: { userId: 'user-1' },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.upVotesBy).toContain('user-1');
      expect(nextState.downVotesBy).not.toContain('user-1');
    });

    test('should handle DOWNVOTE_THREAD action when user has not voted', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      };
      const action = {
        type: ActionType.DOWNVOTE_THREAD,
        payload: { userId: 'user-1' },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.downVotesBy).toContain('user-1');
      expect(nextState.upVotesBy).not.toContain('user-1');
    });

    test('should handle DOWNVOTE_THREAD action when user has upvoted', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        comments: [],
      };
      const action = {
        type: ActionType.DOWNVOTE_THREAD,
        payload: { userId: 'user-1' },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.downVotesBy).toContain('user-1');
      expect(nextState.upVotesBy).not.toContain('user-1');
    });

    test('should handle NEUTRAL_THREAD action to remove all votes', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: ['user-1'],
        downVotesBy: [],
        comments: [],
      };
      const action = {
        type: ActionType.NEUTRAL_THREAD,
        payload: { userId: 'user-1' },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.upVotesBy).not.toContain('user-1');
      expect(nextState.downVotesBy).not.toContain('user-1');
    });
  });

  describe('Comment actions', () => {
    test('should handle CREATE_COMMENT action', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      };
      const comment = {
        id: 'comment-1',
        content: 'This is a comment',
        upVotesBy: [],
        downVotesBy: [],
      };
      const action = {
        type: ActionType.CREATE_COMMENT,
        payload: comment,
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments).toHaveLength(1);
      expect(nextState.comments[0]).toEqual(comment);
    });

    test('should handle UPVOTE_COMMENT action', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'This is a comment',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      };
      const action = {
        type: ActionType.UPVOTE_COMMENT,
        payload: {
          commentId: 'comment-1',
          userId: 'user-1',
        },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments[0].upVotesBy).toContain('user-1');
    });

    test('should handle UPVOTE_COMMENT action when user has downvoted', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'This is a comment',
            upVotesBy: [],
            downVotesBy: ['user-1'],
          },
        ],
      };
      const action = {
        type: ActionType.UPVOTE_COMMENT,
        payload: {
          commentId: 'comment-1',
          userId: 'user-1',
        },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments[0].upVotesBy).toContain('user-1');
      expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
    });

    test('should handle DOWNVOTE_COMMENT action', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'This is a comment',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      };
      const action = {
        type: ActionType.DOWNVOTE_COMMENT,
        payload: {
          commentId: 'comment-1',
          userId: 'user-1',
        },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments[0].downVotesBy).toContain('user-1');
    });

    test('should handle DOWNVOTE_COMMENT action when user has upvoted', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'This is a comment',
            upVotesBy: ['user-1'],
            downVotesBy: [],
          },
        ],
      };
      const action = {
        type: ActionType.DOWNVOTE_COMMENT,
        payload: {
          commentId: 'comment-1',
          userId: 'user-1',
        },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments[0].downVotesBy).toContain('user-1');
      expect(nextState.comments[0].upVotesBy).not.toContain('user-1');
    });

    test('should handle NEUTRAL_COMMENT action', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'This is a comment',
            upVotesBy: ['user-1'],
            downVotesBy: [],
          },
        ],
      };
      const action = {
        type: ActionType.NEUTRAL_COMMENT,
        payload: {
          commentId: 'comment-1',
          userId: 'user-1',
        },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments[0].upVotesBy).not.toContain('user-1');
      expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
    });

    test('should not modify other comments when acting on a specific comment', () => {
      // Arrange
      const initialState = {
        id: 'thread-1',
        title: 'Thread Title',
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'First comment',
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'comment-2',
            content: 'Second comment',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      };
      const action = {
        type: ActionType.UPVOTE_COMMENT,
        payload: {
          commentId: 'comment-1',
          userId: 'user-1',
        },
      };

      // Act
      const nextState = threadDetailReducer(initialState, action);

      // Assert
      expect(nextState.comments[0].upVotesBy).toContain('user-1');
      expect(nextState.comments[1].upVotesBy).not.toContain('user-1');
      expect(nextState.comments[1]).toEqual(initialState.comments[1]);
    });
  });

  test('should return current state for unknown action', () => {
    // Arrange
    const currentState = {
      id: 'thread-1',
      title: 'Thread Title',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    // Act
    const nextState = threadDetailReducer(currentState, {
      type: 'UNKNOWN_ACTION',
    });

    // Assert
    expect(nextState).toBe(currentState);
  });
});
