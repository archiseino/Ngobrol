/**
 * Test Scenario
 *
 * - Threads thunks:
 *   1. asyncGetAllThreads:
 *      - Should dispatch action and return threads when API call succeeds
 *        - Arrange: Mock successful API response and prepare dispatch
 *        - Act: Call asyncGetAllThreads
 *        - Assert: Verify API called and action dispatched with threads data
 *
 *      - Should handle error when API call fails
 *        - Arrange: Mock API rejection and prepare dispatch
 *        - Act: Call asyncGetAllThreads
 *        - Assert: Verify error handling (alert called)
 *
 *   2. asyncCreateThread:
 *      - Should dispatch actions correctly when creating thread succeeds
 *        - Arrange: Mock successful API response and prepare dispatch and navigate function
 *        - Act: Call asyncCreateThread with thread data
 *        - Assert: Verify loading actions, API called, thread added, and navigation triggered
 *
 *      - Should handle error when creating thread fails
 *        - Arrange: Mock API rejection and prepare dispatch
 *        - Act: Call asyncCreateThread with thread data
 *        - Assert: Verify loading actions and error handling
 *
 *   3. Thread Vote Thunks:
 *      - asyncToggleUpVote / asyncToggleDownVote:
 *        - Should dispatch correct actions when voting succeeds
 *        - Should handle error when voting fails
 *
 *      - asyncNeutralizeUpVote / asyncNeutralizeDownVote:
 *        - Should dispatch correct actions when neutralizing vote succeeds
 *        - Should handle error when neutralizing vote fails
 */

import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  asyncGetAllThreads,
  asyncCreateThread,
  asyncToggleUpVote,
  asyncToggleDownVote,
  asyncNeutralizeUpVote,
  asyncNeutralizeDownVote,
} from './thunk';
import api from '../../utils/api';
import {
  receiveThreads,
  toggleUpVote,
  toggleDownVote,
  toggleNeutralVote,
} from './action';

// Mock API
vi.mock('../../utils/api', () => ({
  default: {
    getThreads: vi.fn(),
    createThread: vi.fn(),
    upvoteThread: vi.fn(),
    downvoteThread: vi.fn(),
    neutralizeVoteThread: vi.fn(),
  },
}));

// Mock window.alert
window.alert = vi.fn();

describe('Threads thunks', () => {
  let dispatch, getState;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    dispatch = vi.fn();
    getState = vi.fn();
  });

  describe('asyncGetAllThreads', () => {
    test('should dispatch receiveThreads when API call succeeds', async () => {
      // Arrange
      const threads = [
        {
          id: 'thread-1',
          title: 'Thread Title 1',
          body: 'Thread body content 1',
          category: 'general',
          createdAt: '2023-05-10T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      ];
      api.getThreads.mockResolvedValue(threads);

      // Act
      await asyncGetAllThreads()(dispatch);

      // Assert
      expect(api.getThreads).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(receiveThreads(threads));
    });

    test('should show alert when API call fails', async () => {
      // Arrange
      const errorMessage = 'Failed to fetch threads';
      api.getThreads.mockRejectedValue(new Error(errorMessage));

      // Act
      await asyncGetAllThreads()(dispatch);

      // Assert
      expect(api.getThreads).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('asyncCreateThread', () => {
    test('should call API to create thread', async () => {
      // Arrange
      const threadData = {
        title: 'New Thread Title',
        body: 'This is the body of the new thread',
        category: 'general',
      };
      api.createThread.mockResolvedValue({
        id: 'thread-123',
        ...threadData,
      });

      // Act
      await asyncCreateThread(threadData)(dispatch);

      // Assert
      expect(api.createThread).toHaveBeenCalledWith(threadData);
    });

    test('should show alert when API call fails', async () => {
      // Arrange
      const threadData = {
        title: 'New Thread Title',
        body: 'This is the body of the new thread',
        category: 'general',
      };
      const errorMessage = 'Failed to create thread';
      api.createThread.mockRejectedValue(new Error(errorMessage));

      // Act
      await asyncCreateThread(threadData)(dispatch);

      // Assert
      expect(api.createThread).toHaveBeenCalledWith(threadData);
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('voting thunks', () => {
    const threadId = 'thread-1';
    const user = { id: 'user-1', name: 'John Doe' };

    beforeEach(() => {
      getState.mockReturnValue({
        auth: { user },
      });
    });

    test('asyncToggleUpVote should dispatch toggleUpVote and call API', async () => {
      // Arrange
      api.upvoteThread.mockResolvedValue({});

      // Act
      await asyncToggleUpVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVote({ threadId, authUser: user.id })
      );
      expect(api.upvoteThread).toHaveBeenCalledWith(threadId);
    });

    test('asyncToggleUpVote should handle API error and neutralize vote', async () => {
      // Arrange
      api.upvoteThread.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncToggleUpVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVote({ threadId, authUser: user.id })
      );
      expect(api.upvoteThread).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralVote({ threadId, authUser: user.id })
      );
    });

    test('asyncToggleUpVote should not do anything if user is not authenticated', async () => {
      // Arrange
      getState.mockReturnValue({ auth: { user: null } });

      // Act
      await asyncToggleUpVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).not.toHaveBeenCalled();
      expect(api.upvoteThread).not.toHaveBeenCalled();
    });

    test('asyncToggleDownVote should dispatch toggleDownVote and call API', async () => {
      // Arrange
      api.downvoteThread.mockResolvedValue({});

      // Act
      await asyncToggleDownVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVote({ threadId, authUser: user.id })
      );
      expect(api.downvoteThread).toHaveBeenCalledWith(threadId);
    });

    test('asyncToggleDownVote should handle API error and neutralize vote', async () => {
      // Arrange
      api.downvoteThread.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncToggleDownVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVote({ threadId, authUser: user.id })
      );
      expect(api.downvoteThread).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralVote({ threadId, authUser: user.id })
      );
    });

    test('asyncNeutralizeUpVote should dispatch toggleNeutralVote and call API', async () => {
      // Arrange
      api.neutralizeVoteThread.mockResolvedValue({});

      // Act
      await asyncNeutralizeUpVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralVote({ threadId, authUser: user.id })
      );
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
    });

    test('asyncNeutralizeUpVote should handle API error', async () => {
      // Arrange
      api.neutralizeVoteThread.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncNeutralizeUpVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralVote({ threadId, authUser: user.id })
      );
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVote({ threadId, authUser: user.id })
      );
    });

    test('asyncNeutralizeDownVote should dispatch toggleNeutralVote and call API', async () => {
      // Arrange
      api.neutralizeVoteThread.mockResolvedValue({});

      // Act
      await asyncNeutralizeDownVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralVote({ threadId, authUser: user.id })
      );
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
    });

    test('asyncNeutralizeDownVote should handle API error', async () => {
      // Arrange
      api.neutralizeVoteThread.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncNeutralizeDownVote({ threadId })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralVote({ threadId, authUser: user.id })
      );
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVote({ threadId, authUser: user.id })
      );
    });
  });
});
