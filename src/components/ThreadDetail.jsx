import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils'; // assumed util function for formatting time
import PropTypes from 'prop-types';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../states/threadDetail/thunk';

const ThreadDetail = ({ thread = {} }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth || {});

  if (!thread || !thread.id) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  const {
    id,
    title = '',
    body = '',
    category = '',
    createdAt = new Date().toISOString(),
    owner = { name: 'User', avatar: '' },
    upVotesBy = [],
    downVotesBy = [],
  } = thread;

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
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('Please login to vote');
      return;
    }

    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={owner.avatar || 'https://via.placeholder.com/150'}
          alt={`${owner.name}'s avatar`}
          className="w-10 h-10 rounded-full mr-3"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150';
          }}
        />
        <div>
          <h2 className="font-bold text-lg">{owner.name}</h2>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mb-4">
        {category}
      </span>
      <div
        className="prose max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={handleUpVote}
          className={`flex items-center space-x-1 ${
            isUpVoted ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <FaThumbsUp />
          <span>{upVotesBy.length}</span>
        </button>
        <button
          onClick={handleDownVote}
          className={`flex items-center space-x-1 ${
            isDownVoted ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <FaThumbsDown />
          <span>{downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
};

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    owner: PropTypes.object,
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
    comments: PropTypes.array,
  }),
};

export default ThreadDetail;
