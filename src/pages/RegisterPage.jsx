// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { asyncRegisterUser } from '../states/auth/thunk';
import { validateRegisterForm } from '../utils/formValidation';
import { InputField, Button } from '../components/input';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { error: authError } = useSelector((state) => state.auth || {});

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animation variants
  const pageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const formAnimation = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  // Update errors when authError changes
  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({ ...prev, general: authError }));
      setIsLoading(false);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using the validation utility
    const validation = validateRegisterForm(form, confirmPassword);

    if (!validation.isValid) {
      setErrors({ ...validation.errors });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await dispatch(asyncRegisterUser(form));
      // Show success message before navigating
      setErrors({ success: 'Registration successful! You can now log in.' });
      // Navigate to login page after a brief delay to show success message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // The error is now handled by the Redux state
      // We don't need to set errors manually here as it will be done by useEffect
      console.log('Registration failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimation}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        variants={formAnimation}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

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

        {errors.success && (
          <motion.div
            className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.success}
          </motion.div>
        )}

        <InputField
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" disabled={isLoading} fullWidth className="mt-2">
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>

        <motion.div className="mt-6 text-center" whileHover={{ scale: 1.03 }}>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
          >
            Already have an account? Login here
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default RegisterPage;
