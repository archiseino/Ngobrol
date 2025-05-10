// src/pages/LeaderboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { asycnGetAllLeaderboards } from '../states/leaderboards/thunk';
import Loading from '../components/Loading';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  const [isLoading, setIsLoading] = useState(true);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(asycnGetAllLeaderboards());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 overflow-hidden"
        variants={itemVariants}
      >
        <motion.div className="flex items-center mb-8" variants={itemVariants}>
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mr-4 text-3xl"
          >
            🏆
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Leaderboard
          </motion.h1>
        </motion.div>

        <motion.ul className="divide-y divide-gray-100">
          {leaderboards.map(({ user, score }, index) => (
            <motion.li
              key={user.id}
              className="py-4 flex justify-between items-center"
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover={{
                backgroundColor: 'rgba(249, 250, 251, 0.8)',
                transition: { duration: 0.2 },
              }}
              style={{ position: 'relative' }}
            >
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.1 }}>
                  {index < 3 && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`w-7 h-7 flex items-center justify-center rounded-full 
                          ${
                            index === 0
                              ? 'bg-yellow-400'
                              : index === 1
                              ? 'bg-gray-300'
                              : 'bg-amber-700'
                          }`}
                      >
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </motion.div>
                    </div>
                  )}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className={`w-12 h-12 rounded-full border-2 ${
                      index === 0
                        ? 'border-yellow-400'
                        : index === 1
                        ? 'border-gray-300'
                        : index === 2
                        ? 'border-amber-700'
                        : 'border-transparent'
                    }`}
                  />
                </motion.div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    @{user.name.toLowerCase().replace(/\s+/g, '')}
                  </p>
                </div>
              </div>

              <motion.div
                className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-blue-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-blue-600">{score}</span>
                <span className="text-blue-600 text-sm ml-0.5">points</span>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>

        {leaderboards.length === 0 && (
          <motion.div className="text-center py-10" variants={itemVariants}>
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
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
              />
            </svg>
            <p className="text-xl text-gray-500">
              No leaderboard data available
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LeaderboardPage;
