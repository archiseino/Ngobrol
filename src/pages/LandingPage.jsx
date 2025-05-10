import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth || {});

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-indigo-900 text-white overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 overflow-hidden z-0"
        >
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full -top-20 -left-20 opacity-20"></div>
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full -bottom-20 -right-20 opacity-20"></div>
        </motion.div>

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-6xl font-bold mb-6 tracking-tight"
            variants={fadeIn}
          >
            Welcome to Discussion Hub
          </motion.h1>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            Join our community to share ideas, ask questions, and connect with
            like-minded people from around the world.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            variants={fadeIn}
          >
            {user ? (
              <motion.div whileHover={buttonHover}>
                <Link
                  to="/home"
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Go to Discussions
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={buttonHover}>
                  <Link
                    to="/register"
                    className="bg-white text-blue-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Get Started
                  </Link>
                </motion.div>
                <motion.div whileHover={buttonHover}>
                  <Link
                    to="/login"
                    className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-gray-800"
            variants={fadeIn}
          >
            Why Join Our Community?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={featureCardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-blue-600 mb-6"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Engaging Discussions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Participate in meaningful conversations with people who share
                your interests and expand your knowledge.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={featureCardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-blue-600 mb-6"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Safe Environment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our community is moderated to ensure respectful and constructive
                discussions for everyone.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={featureCardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="text-blue-600 mb-6"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                Diverse Topics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore discussions across technology, science, arts, and many
                more fascinating subjects.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-24 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-gray-800"
            variants={fadeIn}
          >
            What Our Members Say
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full mr-5 border-2 border-blue-100 shadow-md"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    Sarah Johnson
                  </h4>
                  <p className="text-blue-600 text-sm">Tech Enthusiast</p>
                </div>
              </motion.div>
              <p className="text-gray-700 italic leading-relaxed text-lg">
                "I've found so many valuable insights and made great connections
                through these discussions. The community is incredibly
                supportive and everyone is so willing to help!"
              </p>
              <div className="mt-4 text-yellow-400 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full mr-5 border-2 border-blue-100 shadow-md"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-800">
                    Michael Chen
                  </h4>
                  <p className="text-blue-600 text-sm">Science Writer</p>
                </div>
              </motion.div>
              <p className="text-gray-700 italic leading-relaxed text-lg">
                "The quality of discussions here is unmatched. I always learn
                something new when I visit and have made amazing connections
                with experts in my field."
              </p>
              <div className="mt-4 text-yellow-400 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-700 to-indigo-900 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 overflow-hidden z-0"
        >
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full top-20 right-20 opacity-20"></div>
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full -bottom-20 -left-20 opacity-20"></div>
        </motion.div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeIn}>
            Ready to Join the Conversation?
          </motion.h2>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            Sign up now and start connecting with our community of thinkers and
            creators from around the world.
          </motion.p>
          <motion.div variants={fadeIn} whileHover={buttonHover}>
            <Link
              to={user ? '/discussions' : '/register'}
              className="inline-block bg-white text-blue-700 px-10 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {user ? 'Go to Discussions' : 'Get Started Free'}
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default LandingPage;
