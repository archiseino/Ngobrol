import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  asyncGetThreadDetail,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncAddComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralUpVoteComment,
  asyncNeutralDownVoteComment,
} from './thunk';
import api from '../../utils/api';
import {
  receiveThreadDetail,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
} from './action';

// Mock dependencies
vi.mock('../../utils/api', () => ({
  default: {
    getThreadDetail: vi.fn(),
    upvoteThread: vi.fn(),
    downvoteThread: vi.fn(),
    neutralizeVoteThread: vi.fn(),
    createComment: vi.fn(),
    upvoteComment: vi.fn(),
    downvoteComment: vi.fn(),
    neutralizeVoteComment: vi.fn(),
  },
}));

// Mock window.alert
window.alert = vi.fn();
window.console.log = vi.fn();
window.console.error = vi.fn();

describe('ThreadDetail thunks', () => {
  let dispatch, getState;

  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    dispatch = vi.fn();
    getState = vi.fn();
  });

  describe('asyncGetThreadDetail', () => {
    test('should dispatch receiveThreadDetail with thread data when API call succeeds', async () => {
      // Arrange
      const threadId = 'thread-1';
      const threadDetail = {
        id: threadId,
        title: 'Thread Title',
        body: 'Thread body content',
        category: 'general',
        createdAt: '2023-05-10T07:00:00.000Z',
        owner: { id: 'user-1', name: 'John Doe' },
        upVotesBy: [],
        downVotesBy: [],
        comments: [],
      };

      api.getThreadDetail.mockResolvedValue(threadDetail);

      // Act
      await asyncGetThreadDetail(threadId)(dispatch);

      // Assert
      expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);
      expect(dispatch).toHaveBeenCalledWith(receiveThreadDetail(threadDetail));
    });

    test('should show alert when API call fails', async () => {
      // Arrange
      const threadId = 'thread-1';
      const errorMessage = 'Failed to fetch thread detail';
      api.getThreadDetail.mockRejectedValue(new Error(errorMessage));

      // Act
      await asyncGetThreadDetail(threadId)(dispatch);

      // Assert
      expect(api.getThreadDetail).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
      expect(window.console.error).toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Thread voting thunks', () => {
    const threadId = 'thread-1';
    const user = { id: 'user-1', name: 'John Doe' };

    beforeEach(() => {
      getState.mockReturnValue({
        auth: { user },
      });
    });

    test('asyncUpVoteThread should dispatch upVoteThread and call API', async () => {
      // Arrange
      api.upvoteThread.mockResolvedValue({});

      // Act
      await asyncUpVoteThread(threadId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(upVoteThread({ userId: user.id }));
      expect(api.upvoteThread).toHaveBeenCalledWith(threadId);
    });

    test('asyncUpVoteThread should handle API error and revert vote', async () => {
      // Arrange
      api.upvoteThread.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncUpVoteThread(threadId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(upVoteThread({ userId: user.id }));
      expect(api.upvoteThread).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThread({ userId: user.id })
      );
    });

    test('asyncUpVoteThread should not do anything if user is not authenticated', async () => {
      // Arrange
      getState.mockReturnValue({ auth: { user: null } });

      // Act
      await asyncUpVoteThread(threadId)(dispatch, getState);

      // Assert
      expect(dispatch).not.toHaveBeenCalled();
      expect(api.upvoteThread).not.toHaveBeenCalled();
    });

    test('asyncDownVoteThread should dispatch downVoteThread and call API', async () => {
      // Arrange
      api.downvoteThread.mockResolvedValue({});

      // Act
      await asyncDownVoteThread(threadId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        downVoteThread({ userId: user.id })
      );
      expect(api.downvoteThread).toHaveBeenCalledWith(threadId);
    });

    test('asyncDownVoteThread should handle API error and revert vote', async () => {
      // Arrange
      api.downvoteThread.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncDownVoteThread(threadId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        downVoteThread({ userId: user.id })
      );
      expect(api.downvoteThread).toHaveBeenCalledWith(threadId);
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThread({ userId: user.id })
      );
    });

    test('asyncNeutralVoteThread should dispatch neutralVoteThread and call API', async () => {
      // Arrange
      api.neutralizeVoteThread.mockResolvedValue({});

      // Act
      await asyncNeutralVoteThread(threadId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteThread({ userId: user.id })
      );
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
    });
  });

  describe('Comment thunks', () => {
    test('asyncAddComment should dispatch createComment with comment data when API call succeeds', async () => {
      // Arrange
      const threadId = 'thread-1';
      const content = 'This is a comment';
      const comment = {
        id: 'comment-1',
        content,
        createdAt: '2023-05-10T07:00:00.000Z',
        owner: { id: 'user-1', name: 'John Doe' },
        upVotesBy: [],
        downVotesBy: [],
      };

      api.createComment.mockResolvedValue(comment);

      // Act
      await asyncAddComment(threadId, content)(dispatch);

      // Assert
      expect(api.createComment).toHaveBeenCalledWith({ id: threadId, content });
      expect(dispatch).toHaveBeenCalledWith(createComment(comment));
    });

    test('asyncAddComment should show alert when API call fails', async () => {
      // Arrange
      const threadId = 'thread-1';
      const content = 'This is a comment';
      const errorMessage = 'Failed to add comment';
      api.createComment.mockRejectedValue(new Error(errorMessage));

      // Act
      await asyncAddComment(threadId, content)(dispatch);

      // Assert
      expect(api.createComment).toHaveBeenCalledWith({ id: threadId, content });
      expect(window.alert).toHaveBeenCalledWith(errorMessage);
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Comment voting thunks', () => {
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const user = { id: 'user-1', name: 'John Doe' };

    beforeEach(() => {
      getState.mockReturnValue({
        auth: { user },
      });
    });

    test('asyncUpvoteComment should dispatch upVoteComment and call API', async () => {
      // Arrange
      api.upvoteComment.mockResolvedValue({});

      // Act
      await asyncUpvoteComment(threadId, commentId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        upVoteComment({ commentId, userId: user.id })
      );
      expect(api.upvoteComment).toHaveBeenCalledWith({ threadId, commentId });
    });

    test('asyncUpvoteComment should handle API error and revert vote', async () => {
      // Arrange
      api.upvoteComment.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncUpvoteComment(threadId, commentId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        upVoteComment({ commentId, userId: user.id })
      );
      expect(api.upvoteComment).toHaveBeenCalledWith({ threadId, commentId });
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteComment({ commentId, userId: user.id })
      );
    });

    test('asyncDownvoteComment should dispatch downVoteComment and call API', async () => {
      // Arrange
      api.downvoteComment.mockResolvedValue({});

      // Act
      await asyncDownvoteComment(threadId, commentId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        downVoteComment({ commentId, userId: user.id })
      );
      expect(api.downvoteComment).toHaveBeenCalledWith({ threadId, commentId });
    });

    test('asyncNeutralUpVoteComment should dispatch neutralVoteComment and call API', async () => {
      // Arrange
      api.neutralizeVoteComment.mockResolvedValue({});

      // Act
      await asyncNeutralUpVoteComment(threadId, commentId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteComment({ commentId, userId: user.id })
      );
      expect(api.neutralizeVoteComment).toHaveBeenCalledWith({
        threadId,
        commentId,
      });
    });

    test('asyncNeutralUpVoteComment should handle API error and revert to upvote', async () => {
      // Arrange
      api.neutralizeVoteComment.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncNeutralUpVoteComment(threadId, commentId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteComment({ commentId, userId: user.id })
      );
      expect(api.neutralizeVoteComment).toHaveBeenCalledWith({
        threadId,
        commentId,
      });
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        upVoteComment({ commentId, userId: user.id })
      );
    });

    test('asyncNeutralDownVoteComment should dispatch neutralVoteComment and call API', async () => {
      // Arrange
      api.neutralizeVoteComment.mockResolvedValue({});

      // Act
      await asyncNeutralDownVoteComment(threadId, commentId)(
        dispatch,
        getState
      );

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteComment({ commentId, userId: user.id })
      );
      expect(api.neutralizeVoteComment).toHaveBeenCalledWith({
        threadId,
        commentId,
      });
    });

    test('asyncNeutralDownVoteComment should handle API error and revert to downvote', async () => {
      // Arrange
      api.neutralizeVoteComment.mockRejectedValue(new Error('Failed'));

      // Act
      await asyncNeutralDownVoteComment(threadId, commentId)(
        dispatch,
        getState
      );

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        neutralVoteComment({ commentId, userId: user.id })
      );
      expect(api.neutralizeVoteComment).toHaveBeenCalledWith({
        threadId,
        commentId,
      });
      expect(window.alert).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        downVoteComment({ commentId, userId: user.id })
      );
    });
  });
});
