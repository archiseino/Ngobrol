# Ngobrol

Part of the React Akhir Submission stuff

Package that we use for kriteria 3:

- [Framer Motion](https://github.com/framer/motion)

## Testing

### Unit Tests

Run unit tests for the state management with Vitest:

```bash
npm test
```

### End-to-End Tests

This project uses Cypress for end-to-end testing. The main test scenarios focus on:

- Login functionality
- Form validation
- Edge cases and error handling
- Visual rendering across different screen sizes

#### Running the End-to-End Tests

To run all Cypress tests headlessly:

```bash
npm run test:e2e
```

To open Cypress Test Runner UI for interactive testing:

```bash
npm run test:e2e:open
```

#### Test Structure

- `login.cy.js` - Main login workflow tests
- `login-edge-cases.cy.js` - Tests for error handling and special cases
- `login-visual.cy.js` - Visual tests for different screen sizes and UI states
