describe('Login Page Visual Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders login form correctly on desktop', () => {
    // Set desktop viewport
    cy.viewport(1280, 720);

    // Check basic layout
    cy.get('form').should('be.visible');
    cy.contains('h2', 'Login').should('be.visible');

    // Take snapshot for visual comparison
    // Note: This requires Cypress plugins for visual testing
    // cy.screenshot('login-desktop');
  });

  it('renders login form correctly on mobile', () => {
    // Set mobile viewport
    cy.viewport('iphone-x');

    // Check basic layout adapts to mobile
    cy.get('form').should('be.visible');
    cy.contains('h2', 'Login').should('be.visible');

    // Form should fit well on mobile screen
    cy.get('form').then(($form) => {
      const formWidth = $form.width();
      const windowWidth = Cypress.config('viewportWidth');
      expect(formWidth).to.be.lessThan(windowWidth);
    });

    // Take snapshot for visual comparison
    // cy.screenshot('login-mobile');
  });

  it('applies correct focus styles to input fields', () => {
    // Focus the email field
    cy.get('input[name="email"]').focus();

    // Check focus ring is applied
    // Note: The exact styles will depend on your CSS
    cy.get('input[name="email"]')
      .should('have.css', 'outline-color')
      .and('not.eq', 'rgb(0, 0, 0)');
  });

  it('displays correct button states (normal, hover, disabled)', () => {
    // Normal state
    cy.contains('button', 'Login').should('be.visible');

    // Hover state
    cy.contains('button', 'Login').trigger('mouseover');

    // Disabled state
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      delay: 1000,
    });

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', 'Login').click();

    cy.contains('button', 'Logging in...').should('be.disabled');
  });
});
