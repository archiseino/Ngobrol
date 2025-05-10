// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Custom command to login
Cypress.Commands.add(
  'login',
  (email = 'test@example.com', password = 'password123') => {
    // Mock successful login response
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('loginRequest');

    // Mock user profile response
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        id: 'user-1',
        name: 'Test User',
        email: email,
      },
    }).as('getProfile');

    // Visit login page
    cy.visit('/login');

    // Fill login form
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button', 'Login').click();

    // Wait for requests to complete
    cy.wait('@loginRequest');
    cy.wait('@getProfile');
  }
);

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
