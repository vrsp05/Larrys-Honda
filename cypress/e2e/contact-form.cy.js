describe('Contact Form Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1280, 720); // Desktop viewport
    cy.get('a[href="#contact"]').first().click();
  });

  it('should display contact form', () => {
    cy.get('#contactForm').should('be.visible');
  });

  it('should validate name field', () => {
    cy.get('.submit-btn').click();
    cy.get('#nameError').should('be.visible');
    cy.get('#name').type('John Doe');
    cy.get('#nameError').should('have.text', '');
  });

  it('should validate email field', () => {
    cy.get('.submit-btn').click();
    cy.get('#emailError').should('be.visible');
    cy.get('#email').type('john@example.com');
    cy.get('#emailError').should('have.text', '');
  });

  it('should validate message field', () => {
    cy.get('.submit-btn').click();
    cy.get('#messageError').should('be.visible');
    cy.get('#message').type('Test message');
    cy.get('#messageError').should('have.text', '');
  });

  it('should accept valid form submission', () => {
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#message').type('I am interested in your Honda Preludes');
    cy.get('.submit-btn').click();
    // After submission, form should be in a valid state
    cy.get('#nameError').should('have.text', '');
    cy.get('#emailError').should('have.text', '');
    cy.get('#messageError').should('have.text', '');
  });
});
