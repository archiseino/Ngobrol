describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');

    // Clear localStorage to ensure a clean state
    cy.clearLocalStorage();
  });

  it('displays the login form correctly', () => {
    // Check that the login form elements are visible
    cy.contains('h2', 'Login').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input#rememberMe').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
    cy.contains('a', "Don't have an account? Register here").should(
      'be.visible'
    );
  });

  it('shows validation errors for empty fields', () => {
    // Click the login button without filling the form
    cy.contains('button', 'Login').click();

    // Check that validation errors are shown
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('navigates to register page when clicking the register link', () => {
    // Click the register link
    cy.contains('a', "Don't have an account? Register here").click();

    // Check that we're on the register page
    cy.url().should('include', '/register');
  });

  it('remembers email when "Remember me" is checked', () => {
    const testEmail = 'test@example.com';

    // Fill the form and check "Remember me"
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('input#rememberMe').check();

    // Submit the form (but intercept the API call to prevent actual login)
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('loginRequest');

    cy.contains('button', 'Login').click();
    cy.wait('@loginRequest');

    // Reload the page
    cy.reload();

    // Check that email is remembered
    cy.get('input[name="email"]').should('have.value', testEmail);
    cy.get('input#rememberMe').should('be.checked');
  });
});
