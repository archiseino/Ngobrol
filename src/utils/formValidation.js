/**
 * Form validation utilities for login and registration forms
 */

/**
 * Validates login form input
 * @param {Object} form - The form data containing email and password
 * @returns {Object} - Object with isValid flag and errors
 */
export const validateLoginForm = (form) => {
  const errors = {};

  // Email validation
  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates registration form input
 * @param {Object} form - The form data containing name, email, and password
 * @param {String} confirmPassword - Confirm password input
 * @returns {Object} - Object with isValid flag and errors
 */
export const validateRegisterForm = (form, confirmPassword) => {
  const errors = {};

  // Name validation
  if (!form.name) {
    errors.name = 'Name is required';
  } else if (form.name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  // Email validation
  if (!form.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Confirm password validation
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Helper function to validate email format
 * @param {String} email - Email to validate
 * @returns {Boolean} - True if email format is valid
 */
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
