// / <reference types="Cypress" />

// https://docs.cypress.io/api/introduction/api.html
const wh = { width: 360, height: 640 };

describe('Viewport', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.7:8080');
  });
  function movePiece(number, x, y) {
    cy.get('.mint-tab-container-item')
      .eq(number)
      .trigger('mousedown', { which: 1, pageX: 300, pageY: 320 })
      .trigger('mousemove', { which: 1, pageX: 10, pageY: 320 })
      .trigger('mouseup', { force: true });
    cy.get('.mint-tab-container-item')
      .eq(number + 1)
      .should('be.visible');
  }
  function dropBallInHoop(index) {
    cy.get('.mint-tab-container-item')
      .eq(index)
      .trigger('dragstart')
      .trigger('mousemove', 'right')
      .trigger('dragend');
  }

  it('cy.viewport() - set the viewport size and dimension', () => {
    cy.screenshot();
  });

  it('moves the piece when dragged to valid place', () => {
    movePiece(0, 320, 320);
    movePiece(1, 320, 320);
    movePiece(2, 320, 320);
    cy.get('#close').click();
    // dropBallInHoop(0);
  });
});
