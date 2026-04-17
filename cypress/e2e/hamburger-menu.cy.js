describe('Hamburger Menu - Mobile Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    // Set mobile viewport
    cy.viewport(375, 667);
  });

  it('should display hamburger menu on mobile view', () => {
    cy.get('.hamburger').should('be.visible');
  });

  it('should open menu when hamburger is clicked', () => {
    cy.get('.hamburger').click();
    cy.get('.hamburger').should('have.class', 'active');
    cy.get('.nav-menu').should('have.class', 'active');
  });

  it('should close menu when hamburger is clicked again', () => {
    cy.get('.hamburger').click();
    cy.get('.hamburger').should('have.class', 'active');
    cy.get('.hamburger').click();
    cy.get('.hamburger').should('not.have.class', 'active');
    cy.get('.nav-menu').should('not.have.class', 'active');
  });

  it('should close menu when a navigation link is clicked', () => {
    cy.get('.hamburger').click();
    cy.get('.nav-menu').should('have.class', 'active');
    cy.get('.nav-menu a[href="#gallery"]').click();
    cy.get('.hamburger').should('not.have.class', 'active');
    cy.get('.nav-menu').should('not.have.class', 'active');
  });

  it('should display nav menu hidden on desktop view', () => {
    cy.viewport(1280, 720);
    cy.get('.hamburger').should('not.be.visible');
    cy.get('.nav-menu').should('be.visible');
  });
});
