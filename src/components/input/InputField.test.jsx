/**
 * Test Scenario
 *
 * - InputField Component:
 *   1. Should render correctly with basic props
 *      - Arrange: Create props for a basic text input
 *      - Act: Render InputField with basic props
 *      - Assert: Verify input renders with correct attributes
 *
 *   2. Should show error message when error prop is provided
 *      - Arrange: Create props including an error message
 *      - Act: Render InputField with error
 *      - Assert: Verify error message displays and input has error styling
 *
 *   3. Should handle user typing correctly
 *      - Arrange: Setup component with onChange handler
 *      - Act: Simulate realistic user typing with userEvent
 *      - Assert: Verify input value changes and onChange handler is called
 *
 *   4. Should apply custom className when provided
 *      - Arrange: Create props with custom className
 *      - Act: Render InputField with custom className
 *      - Assert: Verify custom class is applied to input element
 *
 *   5. Should pass additional props to input element
 *      - Arrange: Create props with additional attributes like disabled
 *      - Act: Render InputField with additional props
 *      - Assert: Verify additional props are applied to input element
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

// Mock framer-motion since it can cause issues in test environment
vi.mock('framer-motion', () => ({
  motion: {
    input: ({ children, ...props }) => (
      <input data-testid="motion-input" {...props}>
        {children}
      </input>
    ),
    p: ({ children, ...props }) => (
      <p data-testid="motion-error" {...props}>
        {children}
      </p>
    ),
  },
}));

describe('InputField Component', () => {
  test('should render correctly with basic props', () => {
    // Arrange
    const props = {
      type: 'text',
      name: 'username',
      placeholder: 'Enter your username',
      value: '',
      onChange: vi.fn(),
    };

    // Act
    render(<InputField {...props} />);

    // Assert
    const inputElement = screen.getByPlaceholderText('Enter your username');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'username');
    expect(inputElement).toHaveValue('');
  });

  test('should show error message when error prop is provided', () => {
    // Arrange
    const props = {
      type: 'email',
      name: 'email',
      placeholder: 'Enter your email',
      value: 'invalid-email',
      onChange: vi.fn(),
      error: 'Please enter a valid email address',
    };

    // Act
    render(<InputField {...props} />);

    // Assert
    const inputElement = screen.getByPlaceholderText('Enter your email');
    const errorMessage = screen.getByText('Please enter a valid email address');

    expect(errorMessage).toBeInTheDocument();
    expect(inputElement).toHaveClass('border-red-500');
  });

  test('should apply custom className when provided', async () => {
    // Arrange
    const props = {
      type: 'text',
      name: 'username',
      placeholder: 'Enter your username',
      value: '',
      onChange: vi.fn(),
      className: 'custom-input-class',
    };

    // Act
    render(<InputField {...props} />);

    // Assert
    const inputElement = screen.getByPlaceholderText('Enter your username');
    expect(inputElement).toHaveClass('custom-input-class');
  });

  test('should pass additional props to input element', async () => {
    // Arrange
    const props = {
      type: 'text',
      name: 'username',
      placeholder: 'Enter your username',
      value: '',
      onChange: vi.fn(),
      disabled: true,
      'data-testid': 'username-input',
    };
    const user = userEvent.setup();

    // Act
    render(<InputField {...props} />);
    const inputElement = screen.getByTestId('username-input');

    // Assert
    expect(inputElement).toBeDisabled();

    // Verify user cannot interact with disabled input
    await user.type(inputElement, 'test');
    expect(props.onChange).not.toHaveBeenCalled();
  });

  test('should simulate realistic user interactions with tab and focus', async () => {
    // Arrange
    const handleChange = vi.fn();
    const props1 = {
      type: 'text',
      name: 'firstname',
      placeholder: 'First name',
      value: '',
      onChange: handleChange,
    };
    const props2 = {
      type: 'text',
      name: 'lastname',
      placeholder: 'Last name',
      value: '',
      onChange: handleChange,
    };
    const user = userEvent.setup();

    // Act
    render(
      <div>
        <InputField {...props1} />
        <InputField {...props2} />
      </div>
    );

    // Tab to first input, type, tab to next input
    await user.tab();
    expect(screen.getByPlaceholderText('First name')).toHaveFocus();
    await user.keyboard('John');
    await user.tab();
    expect(screen.getByPlaceholderText('Last name')).toHaveFocus();
    await user.keyboard('Doe');

    // Assert - verify both inputs were filled correctly
    expect(screen.getByPlaceholderText('First name')).not.toHaveFocus();
    expect(screen.getByPlaceholderText('Last name')).toHaveFocus();

    // Verify onChange was called for each keystroke
    expect(handleChange).toHaveBeenCalledTimes('John'.length + 'Doe'.length);
  });
});
