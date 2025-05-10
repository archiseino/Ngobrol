import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';
import {
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralUpVoteComment,
  asyncNeutralDownVoteComment,
} from '../states/threadDetail/thunk';

const CommentItem = ({ comment, threadId }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth || {});
  const { id, content, createdAt, owner, upVotesBy, downVotesBy } = comment;

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);
  const formattedDate = postedAt(
    new Date(createdAt),
    "MMM d, yyyy 'at' h:mm a"
  );

  const handleUpVote = () => {
    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    if (isUpVoted) {
      dispatch(asyncNeutralUpVoteComment(threadId, id));
    } else {
      dispatch(asyncUpvoteComment(threadId, id));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    if (isDownVoted) {
      dispatch(asyncNeutralDownVoteComment(threadId, id));
    } else {
      dispatch(asyncDownvoteComment(threadId, id));
    }
  };

  return (
    <div className='bg-gray-50 rounded-lg p-4 mb-3'>
      <div className='flex items-center mb-2'>
        <img
          src={owner.avatar}
          alt={`${owner.name}'s avatar`}
          className='w-8 h-8 rounded-full mr-2'
        />
        <div>
          <h3 className='font-semibold'>{owner.name}</h3>
          <p className='text-xs text-gray-500'>{formattedDate}</p>
        </div>
      </div>
      <div
        className='prose prose-sm mb-3'
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className='flex items-center space-x-3'>
        <button
          onClick={handleUpVote}
          className={`flex items-center space-x-1 ${
            isUpVoted ? 'text-blue-600' : 'text-gray-500'
          } text-sm`}
        >
          <FaThumbsUp size={14} />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          onClick={handleDownVote}
          className={`flex items-center space-x-1 ${
            isDownVoted ? 'text-red-600' : 'text-gray-500'
          } text-sm`}
        >
          <FaThumbsDown size={14} />
          <span>{downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.object.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

const CommentList = ({ comments, threadId }) => {
  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold mb-4'>Comments ({comments.length})</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} threadId={threadId} />
        ))
      ) : (
        <p className='text-gray-500'>No comments yet</p>
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentList;
