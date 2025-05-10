import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { asyncCreateThread } from '../states/threads/thunk';
import { InputField, Button } from '../components/input';

const AddThreadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    body: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!form.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!form.body.trim()) {
      newErrors.body = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await dispatch(
        asyncCreateThread({
          title: form.title,
          body: form.body,
          category: form.category,
        })
      );

      // Add a small delay to show the submitting state
      setTimeout(() => {
        navigate('/home');
      }, 300);
    } catch (error) {
      setErrors({
        ...errors,
        general: error.message || 'Failed to create thread. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      className="max-w-2xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8"
        variants={itemVariants}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-gray-800"
          variants={itemVariants}
        >
          Create New Thread
        </motion.h2>

        {errors.general && (
          <motion.div
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.general}
          </motion.div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <motion.div variants={itemVariants}>
            <InputField
              type="text"
              name="title"
              placeholder="Thread title"
              value={form.title}
              onChange={handleChange}
              error={errors.title}
              className="text-lg font-medium"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <InputField
              type="text"
              name="category"
              placeholder="Category (e.g. react, javascript, design)"
              value={form.category}
              onChange={handleChange}
              error={errors.category}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Thread content
            </label>
            <motion.textarea
              name="body"
              placeholder="Share your thoughts, questions, or ideas..."
              value={form.body}
              onChange={handleChange}
              rows="8"
              className={`w-full p-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                ${errors.body ? 'border-red-500' : 'border-gray-300'}`}
              whileFocus={{ scale: 1.01 }}
            />
            {errors.body && (
              <motion.p
                className="text-red-500 text-xs mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.body}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <Button type="submit" disabled={isSubmitting} fullWidth>
              <div className="flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Post Thread
                  </>
                )}
              </div>
            </Button>
          </motion.div>
        </form>
      </motion.div>

      <motion.div className="mt-4 text-center" variants={itemVariants}>
        <motion.button
          onClick={() => navigate('/home')}
          className="text-gray-600 hover:text-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Cancel and return to discussions
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default AddThreadPage;
