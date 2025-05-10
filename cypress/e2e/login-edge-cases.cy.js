describe('Login Page Edge Cases', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.clearLocalStorage();
  });

  it('handles network failures gracefully', () => {
    // Simulate network failure
    cy.intercept('POST', '**/login', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
      delay: 500,
    }).as('loginFailed');

    // Submit login credentials
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', 'Login').click();

    // Check for appropriate error handling
    cy.wait('@loginFailed');
    cy.contains(/server error|something went wrong|failed/i).should(
      'be.visible'
    );
  });

  it('disables the login button during form submission', () => {
    // Intercept login request with delay to observe UI during submission
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
      delay: 1000,
    }).as('loginRequest');

    // Submit form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', 'Login').click();

    // Button should be disabled and show loading state
    cy.contains('button', 'Logging in...').should('be.disabled');
  });

  it('clears form fields when navigating away and back', () => {
    // Fill in the form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');

    // Navigate away to register page
    cy.contains('a', "Don't have an account? Register here").click();

    // Navigate back to login
    cy.go('back');

    // Fields should be empty (unless "remember me" was checked)
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('input[name="password"]').should('have.value', '');
  });
});
