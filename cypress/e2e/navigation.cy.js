describe('Navigation and Scrolling', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should scroll to Home section when Home link is clicked', () => {
    cy.get('a[href="#home"]').click();
    cy.get('#home').should('be.visible');
  });

  it('should scroll to About section when About link is clicked', () => {
    cy.get('a[href="#about"]').click();
    cy.get('#about').should('be.visible');
  });

  it('should scroll to Gallery section when Gallery link is clicked', () => {
    cy.get('a[href="#gallery"]').click();
    cy.get('#gallery').should('be.visible');
  });

  it('should scroll to Contact section when Contact link is clicked', () => {
    cy.get('a[href="#contact"]').click();
    cy.get('#contact').should('be.visible');
  });

  it('should scroll smoothly with proper offset (accounting for navbar)', () => {
    cy.get('a[href="#gallery"]').click();
    cy.get('#gallery').then(($gallery) => {
      const galleryTop = $gallery[0].getBoundingClientRect().top;
      // Allow some tolerance for navbar height
      expect(galleryTop).to.be.lessThan(150);
      expect(galleryTop).to.be.greaterThan(-50);
    });
  });

  it('should navigate to gallery section from hero CTA button', () => {
    cy.get('.cta-button').click();
    cy.get('#gallery').should('be.visible');
  });

  it('navbar should remain sticky while scrolling', () => {
    cy.get('.navbar').then(($navbar) => {
      const initialPosition = $navbar.css('position');
      expect(initialPosition).to.equal('sticky');
    });
    
    cy.scrollTo('bottom');
    cy.get('.navbar').should('be.visible');
    cy.get('.navbar').should('have.css', 'position', 'sticky');
  });
});
