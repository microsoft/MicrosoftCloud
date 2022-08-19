/// <reference types="cypress" />

describe('filtering', function () {

  this.beforeAll(function () {
    cy.viewport(1280, 760);
    cy.visit('/');
  });

  it('should filter content using Content Type checkboxes', function () {
    cy.get('.checkbox-group').then($elements => {
      const checkboxGroupLength = $elements.length;
      for (let i = 1; i < checkboxGroupLength + 1; i++) {
        const childLength = $elements[i - 1].children.length;
        for (let j = 2; j < childLength + 1; j++) {
          cy.get(`.checkbox-group:nth-child(${i}) > .checkbox:nth-child(${j}) > label`).click();
          cy.get('.search-results-list').should('have.length.gte', 1);
          cy.get(`.checkbox-group:nth-child(${i}) > .checkbox:nth-child(${j}) > label`).click();
        }
      }
    });
  });

  it('should filter content using input and show NO content results', function () {
    cy.get('.search-input > input').type('asdfasdf');
    cy.get('.search-results-list').should('contain.text', 'No Content Results');
    cy.get('.search-input > input').clear();
  });

  it('should filter content using input and show content results', function () {
    cy.get('.search-input > input').type('building');
    cy.get('.search-results-list').should('have.length.gte', 1);
    cy.get('.search-input > input').clear();
  });

});
