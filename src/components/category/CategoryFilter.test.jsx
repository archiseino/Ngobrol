/**
 * Test Scenario
 *
 * - CategoryFilter Component:
 *   1. Should render correctly with provided categories
 *      - Arrange: Create props with categories and selected category
 *      - Act: Render CategoryFilter component
 *      - Assert: Verify all category buttons are displayed
 *
 *   2. Should highlight the selected category button
 *      - Arrange: Create props with selected category
 *      - Act: Render CategoryFilter component
 *      - Assert: Verify selected category button has the active style
 *
 *   3. Should call onSelectCategory when a category is clicked
 *      - Arrange: Create mock onSelectCategory function
 *      - Act: Simulate user clicking on a category button
 *      - Assert: Verify onSelectCategory is called with the correct category
 *
 *   4. Should highlight "All" button when no category is selected
 *      - Arrange: Create props with selectedCategory as null
 *      - Act: Render CategoryFilter component
 *      - Assert: Verify "All" button has active style
 *
 *   5. Should call onSelectCategory with null when "All" button is clicked
 *      - Arrange: Create mock onSelectCategory function
 *      - Act: Simulate user clicking on the "All" button
 *      - Assert: Verify onSelectCategory is called with null
 *
 *   6. Should support keyboard navigation between category buttons
 *      - Arrange: Create props with categories
 *      - Act: Simulate user using Tab key to navigate through buttons
 *      - Assert: Verify focus moves between buttons correctly
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import CategoryFilter from './CategoryFilter';

// Mock framer-motion to avoid test issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => (
      <div data-testid="motion-container" {...props}>
        {children}
      </div>
    ),
    button: ({ children, ...props }) => (
      <button data-testid="motion-button" {...props}>
        {children}
      </button>
    ),
  },
}));

describe('CategoryFilter Component', () => {
  // Common test data
  const categories = ['react', 'javascript', 'frontend', 'redux'];

  test('should render correctly with provided categories', async () => {
    // Arrange
    const props = {
      categories,
      selectedCategory: null,
      onSelectCategory: vi.fn(),
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Assert
    expect(screen.getByText('Filter by Category')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();

    // Check each category is rendered
    categories.forEach((category) => {
      expect(screen.getByText(`#${category}`)).toBeInTheDocument();
    });
  });

  test('should highlight the selected category button', () => {
    // Arrange
    const selectedCategory = 'javascript';
    const props = {
      categories,
      selectedCategory,
      onSelectCategory: vi.fn(),
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Assert
    const selectedButton = screen.getByText(`#${selectedCategory}`);
    expect(selectedButton).toHaveClass('bg-blue-600');
    expect(selectedButton).toHaveClass('text-white');

    // Other buttons should not be highlighted
    const otherButton = screen.getByText('#react');
    expect(otherButton).not.toHaveClass('bg-blue-600');
    expect(otherButton).toHaveClass('bg-gray-100');
  });

  test('should call onSelectCategory when a category is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const onSelectCategory = vi.fn();
    const props = {
      categories,
      selectedCategory: null,
      onSelectCategory,
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Simulate user clicking a category button
    await user.click(screen.getByText('#redux'));

    // Assert
    expect(onSelectCategory).toHaveBeenCalledWith('redux');
  });

  test('should highlight "All" button when no category is selected', () => {
    // Arrange
    const props = {
      categories,
      selectedCategory: null,
      onSelectCategory: vi.fn(),
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Assert
    const allButton = screen.getByText('All');
    expect(allButton).toHaveClass('bg-blue-600');
    expect(allButton).toHaveClass('text-white');

    // Category buttons should not be highlighted
    categories.forEach((category) => {
      const categoryButton = screen.getByText(`#${category}`);
      expect(categoryButton).not.toHaveClass('bg-blue-600');
    });
  });

  test('should call onSelectCategory with null when "All" button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const onSelectCategory = vi.fn();
    const props = {
      categories,
      selectedCategory: 'react', // Start with a selected category
      onSelectCategory,
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Simulate user clicking the "All" button
    await user.click(screen.getByText('All'));

    // Assert
    expect(onSelectCategory).toHaveBeenCalledWith(null);
  });

  test('should render empty state when no categories are provided', async () => {
    // Arrange
    const props = {
      categories: [],
      selectedCategory: null,
      onSelectCategory: vi.fn(),
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Assert
    // Should still show the heading and "All" button
    expect(screen.getByText('Filter by Category')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    // But no category buttons
    expect(screen.queryByText(/^#/)).not.toBeInTheDocument();
  });

  test('should support keyboard navigation between category buttons', async () => {
    // Arrange
    const user = userEvent.setup();
    const onSelectCategory = vi.fn();
    const props = {
      categories,
      selectedCategory: null,
      onSelectCategory,
    };

    // Act
    render(<CategoryFilter {...props} />);

    // Press Tab to focus on the first button ("All")
    await user.tab();

    // Assert - "All" button should be focused
    expect(screen.getByText('All')).toHaveFocus();

    // Press Tab again to focus on the first category button
    await user.tab();
    expect(screen.getByText('#react')).toHaveFocus();

    // Press Space to select the category
    await user.keyboard(' ');
    expect(onSelectCategory).toHaveBeenCalledWith('react');

    // Continue tabbing through the rest of the buttons
    await user.tab();
    expect(screen.getByText('#javascript')).toHaveFocus();

    await user.tab();
    expect(screen.getByText('#frontend')).toHaveFocus();

    // Press Enter to select this category
    await user.keyboard('{Enter}');
    expect(onSelectCategory).toHaveBeenCalledWith('frontend');
  });
});
