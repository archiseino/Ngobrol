/**
 * Test Scenario - Login Page
 *
 * - Login Page:
 *   1. Should display the login form correctly
 *      - Arrange: Visit the login page
 *      - Act: None (visual test)
 *      - Assert: Verify all form elements are visible
 *
 *   2. Should show validation errors for empty fields
 *      - Arrange: Visit login page
 *      - Act: Submit form without filling any fields
 *      - Assert: Verify appropriate validation error messages appear
 *
 *   3. Should navigate to register page when clicking the register link
 *      - Arrange: Visit login page
 *      - Act: Click on the register link
 *      - Assert: Verify URL changes to register page
 *
 *   4. Should remember email when "Remember me" is checked
 *      - Arrange: Visit login page and set up API intercept
 *      - Act: Fill form, check "Remember me", submit form, reload page
 *      - Assert: Verify email field retains the value and checkbox remains checked
 *
 *   5. Should successfully log in with valid credentials
 *      - Arrange: Visit login page and set up API intercept for successful login
 *      - Act: Enter valid credentials and submit form
 *      - Assert: Verify redirect to home page and authentication token is set
 *
 *   6. Should show error message with invalid credentials
 *      - Arrange: Visit login page and set up API intercept for failed login
 *      - Act: Enter invalid credentials and submit form
 *      - Assert: Verify error message is displayed and no redirect occurs
 */

describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');

    // Clear localStorage to ensure a clean state
    cy.clearLocalStorage();
  });

  it('displays the login form correctly', () => {
    // Arrange - Page is already loaded from beforeEach

    // Act - No action needed for this visual test

    // Assert - Verify all form elements are visible
    cy.contains('h2', 'Login').should('be.visible');
    cy.get('input[name="email"]')
      .should('be.visible')
      .and('have.attr', 'type', 'email');
    cy.get('input[name="password"]')
      .should('be.visible')
      .and('have.attr', 'type', 'password');
    cy.get('input#rememberMe').should('be.visible');
    cy.contains('button', 'Login').should('be.visible').and('be.enabled');
    cy.contains('a', "Don't have an account? Register here").should(
      'be.visible'
    );
  });

  it('shows validation errors for empty fields', () => {
    // Arrange - Page is already loaded from beforeEach

    // Act - Submit the form without entering any data
    cy.contains('button', 'Login').click();

    // Assert - Validation errors should be displayed
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');

    // Check that error styling is applied to inputs
    cy.get('input[name="email"]')
      .should('have.class', 'border-red-500')
      .parent()
      .find('.text-red-500')
      .should('contain', 'Email is required');

    cy.get('input[name="password"]')
      .should('have.class', 'border-red-500')
      .parent()
      .find('.text-red-500')
      .should('contain', 'Password is required');
  });

  it('navigates to register page when clicking the register link', () => {
    // Arrange - Page is already loaded from beforeEach

    // Act - Click on the register link
    cy.contains('a', "Don't have an account? Register here").click();

    // Assert - Verify navigation to register page
    cy.url().should('include', '/register');
    cy.contains('h2', 'Create an Account').should('be.visible');
  });

  it('remembers email when "Remember me" is checked', () => {
    // Arrange - Set up test data and API mock
    const testEmail = 'test@example.com';
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('loginRequest');

    // Act - Fill form with "Remember me" checked and submit
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('input#rememberMe').check();
    cy.contains('button', 'Login').click();
    cy.wait('@loginRequest');

    // Reload the page to verify persistence
    cy.reload();

    // Assert - Email should be remembered and checkbox should remain checked
    cy.get('input[name="email"]').should('have.value', testEmail);
    cy.get('input#rememberMe').should('be.checked');

    // Verify localStorage contains the saved email
    cy.window().then((win) => {
      expect(win.localStorage.getItem('rememberedEmail')).to.eq(testEmail);
    });
  });

  it('successfully logs in with valid credentials', () => {
    // Arrange - Set up test data and API mocks for the login flow
    const validEmail = 'valid@example.com';
    const validPassword = 'valid-password';
    const token = 'valid-auth-token';

    // Mock the login API call
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'Login success',
        data: {
          token: token,
        },
      },
    }).as('loginApiCall');

    // Mock the subsequent user profile API call
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User fetched',
        data: {
          user: {
            id: 'user-123',
            name: 'Test User',
            email: validEmail,
          },
        },
      },
    }).as('getUserProfile');

    // Act - Fill form with valid credentials and submit
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);
    cy.contains('button', 'Login').click();

    // Assert - Verify login API was called with correct data
    cy.wait('@loginApiCall').its('request.body').should('include', {
      email: validEmail,
      password: validPassword,
    });

    // Wait for the profile fetch
    cy.wait('@getUserProfile');

    // Verify redirect to home page
    cy.url().should('include', '/home');

    // Verify authentication token is stored with the correct key
    cy.window().then((win) => {
      expect(win.localStorage.getItem('accessToken')).to.eq(token);
    });
  });

  it('shows error message with invalid credentials', () => {
    // Arrange - Set up test data and API mock for failed login
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'wrong-password';
    const errorMessage = 'Invalid email or password';

    cy.intercept('POST', '**/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: errorMessage,
      },
    }).as('failedLogin');

    // Act - Fill form with invalid credentials and submit
    cy.get('input[name="email"]').type(invalidEmail);
    cy.get('input[name="password"]').type(invalidPassword);
    cy.contains('button', 'Login').click();

    // Assert - Verify API was called with the credentials
    cy.wait('@failedLogin').its('request.body').should('include', {
      email: invalidEmail,
      password: invalidPassword,
    });

    // Verify error message is displayed
    // Note: This might need adjustment based on exactly how your app shows errors
    cy.contains(errorMessage).should('be.visible');

    // Verify we're still on the login page (no redirect)
    cy.url().should('include', '/login');

    // Verify error is highlighted appropriately for accessibility
    // These selectors might need to be adjusted based on your actual UI implementation
    cy.get('.bg-red-100').should('be.visible'); // Assuming error has this class based on LoginPage.jsx
  });
});
