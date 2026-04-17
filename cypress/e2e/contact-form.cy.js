describe('Contact Form Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1280, 720); // Desktop viewport
    cy.get('a[href="#contact"]').first().click();
  });

  it('should display contact form', () => {
    cy.get('#contactForm').should('be.visible');
  });

  it('should show error when submitting empty form', () => {
    cy.get('.submit-btn').click();
    cy.get('#nameError').should('have.text', 'Please enter your name');
    cy.get('#emailError').should('have.text', 'Please enter your email address');
    cy.get('#messageError').should('have.text', 'Please enter a message');
  });

  it('should show error for invalid email', () => {
    cy.get('#name').clear().type('John Doe');
    cy.get('#email').clear().type('invalid-email');
    cy.get('#message').clear().type('Test message');
    cy.get('.submit-btn').click();
    cy.get('#emailError').should('have.text', 'Please enter a valid email address');
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

  it('should highlight input fields with errors', () => {
    cy.get('.submit-btn').click();
    cy.get('#name').should('have.class', 'input-error');
    cy.get('#email').should('have.class', 'input-error');
    cy.get('#message').should('have.class', 'input-error');
  });

  it('should accept valid form submission', () => {
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#message').type('I am interested in your Honda Preludes');
    cy.get('.submit-btn').click();
    // Form should submit without errors (success message should appear or form should clear)
    cy.get('#nameError').should('have.text', '');
    cy.get('#emailError').should('have.text', '');
    cy.get('#messageError').should('have.text', '');
  });
});
