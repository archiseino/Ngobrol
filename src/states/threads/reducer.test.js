import { describe, test, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  test('should return the initial state when no action is provided', () => {
    // Arrange
    const initialState = [];

    // Act
    const nextState = threadsReducer(undefined, {});

    // Assert
    expect(nextState).toEqual(initialState);
  });

  test('should handle RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = [];
    const threads = [
      {
        id: 'thread-1',
        title: 'Thread Title 1',
        body: 'Thread body content 1',
        category: 'general',
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'thread-2',
        title: 'Thread Title 2',
        body: 'Thread body content 2',
        category: 'react',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(threads);
  });

  test('should handle ADD_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Title 1',
        body: 'Thread body content 1',
        category: 'general',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Title 2',
      body: 'Thread body content 2',
      category: 'react',
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  describe('thread voting actions', () => {
    const initialThreads = [
      {
        id: 'thread-1',
        title: 'Thread Title 1',
        body: 'Thread body content 1',
        category: 'general',
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'thread-2',
        title: 'Thread Title 2',
        body: 'Thread body content 2',
        category: 'react',
        upVotesBy: ['user-2'],
        downVotesBy: [],
      },
    ];

    test('should handle TOGGLE_UP_VOTE_THREAD when user has not voted', () => {
      // Arrange
      const action = {
        type: ActionType.TOGGLE_UP_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };

      // Act
      const nextState = threadsReducer(initialThreads, action);

      // Assert
      expect(nextState[0].upVotesBy).toContain('user-1');
      expect(nextState[0].downVotesBy).not.toContain('user-1');
      // Other thread should not be affected
      expect(nextState[1]).toEqual(initialThreads[1]);
    });

    test('should handle TOGGLE_UP_VOTE_THREAD when user has already upvoted (toggle off)', () => {
      // Arrange
      const initialStateWithVote = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ];
      const action = {
        type: ActionType.TOGGLE_UP_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };

      // Act
      const nextState = threadsReducer(initialStateWithVote, action);

      // Assert
      expect(nextState[0].upVotesBy).not.toContain('user-1');
    });

    test('should handle TOGGLE_UP_VOTE_THREAD when user has downvoted (switch vote)', () => {
      // Arrange
      const initialStateWithVote = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ];
      const action = {
        type: ActionType.TOGGLE_UP_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };

      // Act
      const nextState = threadsReducer(initialStateWithVote, action);

      // Assert
      expect(nextState[0].upVotesBy).toContain('user-1');
      expect(nextState[0].downVotesBy).not.toContain('user-1');
    });

    test('should handle TOGGLE_DOWN_VOTE_THREAD when user has not voted', () => {
      // Arrange
      const action = {
        type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };

      // Act
      const nextState = threadsReducer(initialThreads, action);

      // Assert
      expect(nextState[0].downVotesBy).toContain('user-1');
      expect(nextState[0].upVotesBy).not.toContain('user-1');
    });

    test('should handle TOGGLE_DOWN_VOTE_THREAD when user has already downvoted (toggle off)', () => {
      // Arrange
      const initialStateWithVote = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ];
      const action = {
        type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };

      // Act
      const nextState = threadsReducer(initialStateWithVote, action);

      // Assert
      expect(nextState[0].downVotesBy).not.toContain('user-1');
    });

    test('should handle TOGGLE_DOWN_VOTE_THREAD when user has upvoted (switch vote)', () => {
      // Arrange
      const initialStateWithVote = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ];
      const action = {
        type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };

      // Act
      const nextState = threadsReducer(initialStateWithVote, action);

      // Assert
      expect(nextState[0].downVotesBy).toContain('user-1');
      expect(nextState[0].upVotesBy).not.toContain('user-1');
    });

    test('should handle TOGGLE_NEUTRAL_VOTE_THREAD', () => {
      // Arrange
      const initialStateWithVotes = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
        {
          id: 'thread-2',
          title: 'Thread Title 2',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ];

      // Act - neutralize upvote
      const action1 = {
        type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
        payload: {
          threadId: 'thread-1',
          authUser: 'user-1',
        },
      };
      const nextState1 = threadsReducer(initialStateWithVotes, action1);

      // Assert
      expect(nextState1[0].upVotesBy).not.toContain('user-1');
      expect(nextState1[0].downVotesBy).not.toContain('user-1');

      // Act - neutralize downvote
      const action2 = {
        type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
        payload: {
          threadId: 'thread-2',
          authUser: 'user-1',
        },
      };
      const nextState2 = threadsReducer(initialStateWithVotes, action2);

      // Assert
      expect(nextState2[1].upVotesBy).not.toContain('user-1');
      expect(nextState2[1].downVotesBy).not.toContain('user-1');
    });
  });

  test('should return current state for unknown action', () => {
    // Arrange
    const currentState = [
      {
        id: 'thread-1',
        title: 'Thread Title 1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    // Act
    const nextState = threadsReducer(currentState, { type: 'UNKNOWN_ACTION' });

    // Assert
    expect(nextState).toBe(currentState);
  });
});
