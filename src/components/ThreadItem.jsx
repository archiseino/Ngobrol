import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { postedAt } from '../utils'; // assumed util function for formatting time

const ThreadItem = ({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
}) => {
  // Animation variants for interaction
  const hoverScale = {
    scale: 1.01,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2 },
  };

  return (
    <motion.div
      className="border rounded-2xl p-5 bg-white dark:bg-gray-800 overflow-hidden"
      whileHover={hoverScale}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="text-sm font-medium text-blue-500 mb-2 inline-block"
        whileHover={{ scale: 1.05 }}
      >
        #{category}
      </motion.div>

      <Link to={`/threads/${id}`} className="block">
        <motion.h2
          className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors hover:text-blue-600"
          whileHover={{ x: 3 }}
        >
          {title}
        </motion.h2>
      </Link>

      <div
        className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: `${body.slice(0, 120)}${body.length > 120 ? '...' : ''}`,
        }}
      />

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-6 h-6 rounded-full object-cover border border-gray-200"
          />
          <span className="font-medium">{user.name}</span>
        </motion.div>
        <div>{postedAt(createdAt)}</div>
      </div>

      <motion.div
        className="flex gap-5 text-gray-600 dark:text-gray-300 text-sm pt-3 border-t border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="flex items-center gap-1"
          whileHover={{ scale: 1.1, color: '#4F46E5' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
          </svg>
          <span>{upVotesBy.length}</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-1"
          whileHover={{ scale: 1.1, color: '#EF4444' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
          </svg>
          <span>{downVotesBy.length}</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-1"
          whileHover={{ scale: 1.1, color: '#0EA5E9' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z"
              clipRule="evenodd"
            />
          </svg>
          <span>{totalComments}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

export default ThreadItem;
