import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Button = ({
  type = 'button',
  children,
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
  variant = 'primary', // primary, secondary, or outlined
  ...props
}) => {
  // Define styles based on variant
  const variantStyles = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-400',
    outlined:
      'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2.5 px-4 rounded-lg transition-colors ${
        variantStyles[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined']),
};

export default Button;
