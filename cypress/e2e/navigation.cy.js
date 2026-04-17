describe('Navigation and Scrolling', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1280, 720); // Desktop viewport so we click desktop menu, not mobile menu
  });

  it('should scroll to Home section when Home link is clicked', () => {
    cy.get('a[href="#home"]').first().click();
    cy.get('#home').should('be.visible');
  });

  it('should scroll to About section when About link is clicked', () => {
    cy.get('a[href="#about"]').first().click();
    cy.get('#about').should('be.visible');
  });

  it('should scroll to Gallery section when Gallery link is clicked', () => {
    cy.get('a[href="#gallery"]').first().click();
    cy.get('#gallery').should('be.visible');
  });

  it('should scroll to Contact section when Contact link is clicked', () => {
    cy.get('a[href="#contact"]').first().click();
    cy.get('#contact').should('be.visible');
  });

  it('should scroll smoothly with proper offset (accounting for navbar)', () => {
    cy.get('a[href="#gallery"]').first().click();
    // Just verify gallery becomes visible and scroll happened
    cy.get('#gallery').should('be.visible');
    cy.get('#gallery').then(($gallery) => {
      const galleryRect = $gallery[0].getBoundingClientRect();
      // Gallery should be near the top of the viewport
      expect(galleryRect.top).to.be.lessThan(200);
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
