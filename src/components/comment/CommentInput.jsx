import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncAddComment } from '../../states/threadDetail/thunk';

const CommentInput = ({ threadId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user: authUser } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    if (!authUser) {
      alert('Please login to comment');
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(asyncAddComment(threadId, content));
      setContent(''); // Clear the input after successful submission
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4 mb-6'>
      <h3 className='text-lg font-semibold mb-3'>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className='w-full border rounded-lg p-2 mb-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
          rows='3'
          placeholder='What are your thoughts?'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting || !authUser}
        />
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300'
            disabled={isSubmitting || !content.trim() || !authUser}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
        {!authUser && (
          <p className='text-sm text-gray-500 mt-2'>
            You need to be logged in to comment
          </p>
        )}
      </form>
    </div>
  );
};

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
