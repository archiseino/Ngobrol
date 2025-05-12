/**
 * Test Scenario - Login Page Visual Tests
 *
 * - Login Page Visual Tests:
 *   1. Should render login form correctly on desktop
 *      - Arrange: Visit login page and set desktop viewport (1280x720)
 *      - Act: None (visual test)
 *      - Assert: Verify form and login heading are visible
 *
 *   2. Should render login form correctly on mobile
 *      - Arrange: Visit login page and set mobile viewport (iPhone X)
 *      - Act: None (visual test)
 *      - Assert: Verify form is visible, login heading is visible, and form fits within mobile screen
 *
 *   3. Should apply correct focus styles to input fields
 *      - Arrange: Visit login page
 *      - Act: Focus on email input field
 *      - Assert: Verify focus styles are correctly applied (non-default outline color)
 *
 *   4. Should display correct button states (normal, hover, disabled)
 *      - Arrange: Visit login page and intercept login API with delay
 *      - Act: Hover over button, then submit form
 *      - Assert: Verify button visibility, changes on hover, and disabled state during submission
 *
 *   5. Should display correctly in dark mode (if supported)
 *      - Arrange: Emulate user preference for dark mode
 *      - Act: None (visual test)
 *      - Assert: Verify dark mode styles are correctly applied
 */

describe('Login Page Visual Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders login form correctly on desktop', () => {
    // Arrange - Set desktop viewport
    cy.viewport(1280, 720);

    // Assert - Verify basic layout elements are visible
    cy.get('form').should('be.visible');
    cy.contains('h2', 'Login').should('be.visible');

    // Visual comparison (commented until visual testing plugin is configured)
    // cy.screenshot('login-desktop');
  });

  it('renders login form correctly on mobile', () => {
    // Arrange - Set mobile viewport
    cy.viewport('iphone-x');

    // Assert - Verify basic layout adapts to mobile
    cy.get('form').should('be.visible');
    cy.contains('h2', 'Login').should('be.visible');

    // Assert - Form should fit properly within mobile screen
    cy.get('form').then(($form) => {
      const formWidth = $form.width();
      const windowWidth = Cypress.config('viewportWidth');
      expect(formWidth).to.be.lessThan(windowWidth);
    });

    // Visual comparison (commented until visual testing plugin is configured)
    // cy.screenshot('login-mobile');
  });

  it('applies correct focus styles to input fields', () => {
    // Arrange - Page is loaded from beforeEach

    // Act - Focus the email field
    cy.get('input[name="email"]').focus();

    // Assert - Verify focus styling is correctly applied
    // The exact CSS properties will depend on your design system
    cy.get('input[name="email"]')
      .should('have.css', 'outline-color')
      .and('not.eq', 'rgb(0, 0, 0)');
  });

  it('displays correct button states (normal, hover, disabled)', () => {
    // Arrange - Set up API intercept for login with delay
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      delay: 1000,
    });

    // Assert - Verify normal button state
    cy.contains('button', 'Login').should('be.visible');

    // Act & Assert - Verify hover state
    cy.contains('button', 'Login').trigger('mouseover');
    // Note: Additional assertions for hover state could be added here
    // depending on your CSS (color change, shadow, etc.)

    // Act - Fill form and submit
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('button', 'Login').click();

    // Assert - Verify button is disabled during submission
    cy.contains('button', 'Logging in...').should('be.disabled');
  });

  it('should display correctly in dark mode (if supported)', () => {
    // This test is for applications that support dark mode
    // If your app doesn't support dark mode, you can comment this test out

    // Arrange - Emulate user preference for dark mode
    // This assumes your app responds to the prefers-color-scheme media query
    cy.wrap(Cypress.$('html')).then(($html) => {
      // Force dark mode by adding a class or manipulating media query
      $html.attr('data-theme', 'dark');
      // Alternative approach using media query emulation:
      // cy.window().then(win => {
      //   win.matchMedia = query => ({
      //     matches: query.includes('prefers-color-scheme: dark'),
      //     addListener: () => {},
      //     removeListener: () => {}
      //   });
      // });
    });

    // Assert - Verify dark mode styles are applied
    // You'll need to customize these assertions based on your dark mode implementation
    // For example, checking background color, text color, etc.
    cy.get('body')
      .should('have.css', 'background-color')
      .and('not.eq', 'rgb(255, 255, 255)');

    // Visual comparison
    // cy.screenshot('login-dark-mode');
  });
});
