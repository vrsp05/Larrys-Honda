describe('Gallery Pagination', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('a[href="#gallery"]').click();
  });

  it('should display initial page (page 1)', () => {
    cy.get('.page-number[data-page="1"]').should('have.class', 'active');
  });

  it('should display all pagination page numbers', () => {
    cy.get('.page-number').should('have.length', 3);
    cy.get('.page-number[data-page="1"]').should('exist');
    cy.get('.page-number[data-page="2"]').should('exist');
    cy.get('.page-number[data-page="3"]').should('exist');
  });

  it('should navigate to page 2 when page 2 button is clicked', () => {
    cy.get('.page-number[data-page="2"]').click();
    cy.get('.page-number[data-page="2"]').should('have.class', 'active');
    cy.get('.page-number[data-page="1"]').should('not.have.class', 'active');
  });

  it('should navigate to page 3 when page 3 button is clicked', () => {
    cy.get('.page-number[data-page="3"]').click();
    cy.get('.page-number[data-page="3"]').should('have.class', 'active');
    cy.get('#contact').should('not.be.visible');
    cy.get('#gallery').should('be.visible');
  });

  it('should navigate using Next button', () => {
    cy.get('.pagination-btn.prev-page').should('be.disabled');
    cy.get('.pagination-btn.next-page').should('not.be.disabled');
    cy.get('.pagination-btn.next-page').click();
    cy.get('.page-number[data-page="2"]').should('have.class', 'active');
  });

  it('should navigate using Previous button', () => {
    cy.get('.page-number[data-page="2"]').click();
    cy.get('.pagination-btn.prev-page').should('not.be.disabled');
    cy.get('.pagination-btn.prev-page').click();
    cy.get('.page-number[data-page="1"]').should('have.class', 'active');
  });

  it('should disable Previous button on first page', () => {
    cy.get('.page-number[data-page="1"]').should('have.class', 'active');
    cy.get('.pagination-btn.prev-page').should('be.disabled');
  });

  it('should disable Next button on last page', () => {
    cy.get('.page-number[data-page="3"]').click();
    cy.get('.pagination-btn.next-page').should('be.disabled');
  });

  it('page 3 button should not navigate to contact section', () => {
    cy.get('.page-number[data-page="3"]').click();
    cy.get('#gallery').should('be.visible');
    cy.get('#contact').then(($contact) => {
      const contactTop = $contact[0].getBoundingClientRect().top;
      expect(contactTop).to.be.greaterThan(window.innerHeight);
    });
  });

  it('should display correct gallery items on page 2', () => {
    cy.get('.gallery-item:not(.hidden)').should('have.length', 2);
    cy.get('.page-number[data-page="2"]').click();
    cy.get('.gallery-item:not(.hidden)').should('have.length', 2);
  });
});
