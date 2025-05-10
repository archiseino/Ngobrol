// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { asyncGetAllUsers } from '../states/users/thunk';
import { asyncGetAllThreads } from '../states/threads/thunk';
import ThreadItem from '../components/ThreadItem';
import CategoryFilter from '../components/category/CategoryFilter';
import { Button } from '../components/input';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Improve selectors to avoid unnecessary re-renders
  const threads = useSelector((state) => state.threads || []);
  const users = useSelector((state) => state.users || []);
  const { user: authUser } = useSelector((state) => state.auth || {});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  // Load threads and users when the component mounts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        dispatch(asyncGetAllUsers()),
        dispatch(asyncGetAllThreads()),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, [dispatch]);

  const getUserById = (userId) =>
    users.find((user) => user.id === userId) || {
      name: 'Unknown User',
      avatar: '',
    };

  // Extract unique categories from threads
  const categories = [
    ...new Set(
      threads
        .filter((thread) => thread.category)
        .map((thread) => thread.category)
    ),
  ];

  // Filter threads by selected category
  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex justify-between items-center mb-6"
        variants={fadeInUp}
      >
        <motion.h1
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discussions
        </motion.h1>

        {authUser && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/new">
              <Button variant="primary">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Thread
                </div>
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>

      <motion.div className="mb-6" variants={fadeInUp}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </motion.div>

      <motion.div className="space-y-4" variants={containerVariants}>
        {filteredThreads.map((thread, index) => {
          const user = getUserById(thread.ownerId);
          return (
            <motion.div
              key={thread.id}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <ThreadItem
                id={thread.id}
                title={thread.title}
                body={thread.body}
                category={thread.category}
                createdAt={thread.createdAt}
                upVotesBy={thread.upVotesBy}
                downVotesBy={thread.downVotesBy}
                totalComments={thread.totalComments}
                user={user}
              />
            </motion.div>
          );
        })}

        {filteredThreads.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <p className="text-xl text-gray-500">
              No threads found in this category
            </p>
            {selectedCategory && (
              <motion.button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => setSelectedCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View all threads
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
