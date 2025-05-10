import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const CheckboxField = ({ id, label, checked, onChange, className = '' }) => {
  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <motion.input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mr-2 h-4 w-4 text-blue-600 cursor-pointer"
        whileTap={{ scale: 0.9 }}
      />
      <motion.label
        htmlFor={id}
        className="text-sm text-gray-600 cursor-pointer select-none"
        whileHover={{ color: '#4B5563' }}
      >
        {label}
      </motion.label>
    </div>
  );
};

CheckboxField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CheckboxField;
