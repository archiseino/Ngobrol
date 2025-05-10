import { describe, test, expect } from 'vitest';
import { 
  ActionType, 
  receiveThreadDetail,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  createComment,
  upVoteComment,
  downVoteComment,
  neutralVoteComment
} from './action';

describe('ThreadDetail actions', () => {
  describe('receiveThreadDetail', () => {
    test('should create an action to receive thread detail', () => {
      // Arrange
      const thread = {
        id: 'thread-1',
        title: 'Thread Title',
        body: 'Thread body content',
        category: 'general',
        createdAt: '2023-05-10T07:00:00.000Z',
        owner: {
          id: 'user-1',
          name: 'John Doe',
          avatar: 'https://avatar.url/john.jpg'
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: []
      };
      
      // Act
      const action = receiveThreadDetail(thread);

      // Assert
      expect(action).toEqual({
        type: ActionType.GET_THREAD_DETAIL,
        payload: { thread }
      });
    });
  });

  describe('thread voting actions', () => {
    test('should create an action for upvoting a thread', () => {
      // Arrange
      const userId = 'user-1';
      
      // Act
      const action = upVoteThread({ userId });

      // Assert
      expect(action).toEqual({
        type: ActionType.UPVOTE_THREAD,
        payload: { userId }
      });
    });

    test('should create an action for downvoting a thread', () => {
      // Arrange
      const userId = 'user-1';
      
      // Act
      const action = downVoteThread({ userId });

      // Assert
      expect(action).toEqual({
        type: ActionType.DOWNVOTE_THREAD,
        payload: { userId }
      });
    });

    test('should create an action for neutralizing a thread vote', () => {
      // Arrange
      const userId = 'user-1';
      
      // Act
      const action = neutralVoteThread({ userId });

      // Assert
      expect(action).toEqual({
        type: ActionType.NEUTRAL_THREAD,
        payload: { userId }
      });
    });
  });

  describe('comment actions', () => {
    test('should create an action for creating a comment', () => {
      // Arrange
      const comment = {
        id: 'comment-1',
        content: 'This is a comment',
        createdAt: '2023-05-10T07:00:00.000Z',
        owner: {
          id: 'user-1',
          name: 'John Doe',
          avatar: 'https://avatar.url/john.jpg'
        },
        upVotesBy: [],
        downVotesBy: []
      };
      
      // Act
      const action = createComment(comment);

      // Assert
      expect(action).toEqual({
        type: ActionType.CREATE_COMMENT,
        payload: comment
      });
    });

    test('should create an action for upvoting a comment', () => {
      // Arrange
      const commentId = 'comment-1';
      const userId = 'user-1';
      
      // Act
      const action = upVoteComment({ commentId, userId });

      // Assert
      expect(action).toEqual({
        type: ActionType.UPVOTE_COMMENT,
        payload: { commentId, userId }
      });
    });

    test('should create an action for downvoting a comment', () => {
      // Arrange
      const commentId = 'comment-1';
      const userId = 'user-1';
      
      // Act
      const action = downVoteComment({ commentId, userId });

      // Assert
      expect(action).toEqual({
        type: ActionType.DOWNVOTE_COMMENT,
        payload: { commentId, userId }
      });
    });

    test('should create an action for neutralizing a comment vote', () => {
      // Arrange
      const commentId = 'comment-1';
      const userId = 'user-1';
      
      // Act
      const action = neutralVoteComment({ commentId, userId });

      // Assert
      expect(action).toEqual({
        type: ActionType.NEUTRAL_COMMENT,
        payload: { commentId, userId }
      });
    });
  });
});
