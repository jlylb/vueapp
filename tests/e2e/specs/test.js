// https://docs.cypress.io/api/introduction/api.html
const wh = { width: 360, height: 640 };

describe('My First Test', () => {
  beforeEach(() => {
    cy.viewport(...wh);
    cy.visit('/');
    cy.get('[type="text"]').type('123456');
  });
});
