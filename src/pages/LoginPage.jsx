// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { asyncLoginUser } from '../states/auth/thunk';
import { validateLoginForm } from '../utils/formValidation';
import { InputField, CheckboxField, Button } from '../components/input';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from Redux
  const { error: authError } = useSelector((state) => state.auth || {});

  // Get the redirect path from location state (where user was trying to access)
  const from = location.state?.from || '/home';

  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

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

  // Check if we have stored credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form using our utility function
    const validation = validateLoginForm(form);

    if (!validation.isValid) {
      setErrors({ ...validation.errors });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Handle "remember me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', form.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      await dispatch(asyncLoginUser(form));
      // Navigate to the originally requested page or home
      navigate(from, { replace: true });
    } catch (error) {
      // The error is now handled by the Redux state
      // We don't need to set errors manually here as it will be done by useEffect
      console.log('Login failed', error);
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
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
        variants={formAnimation}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
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

        <CheckboxField
          id="rememberMe"
          label="Remember me"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />

        <Button type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <motion.div className="mt-6 text-center" whileHover={{ scale: 1.03 }}>
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
          >
            Don't have an account? Register here
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default LoginPage;
