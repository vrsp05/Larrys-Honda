describe('Gallery Carousel', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1280, 720); // Desktop viewport
    cy.get('a[href="#gallery"]').first().click();
  });

  it('should display carousel controls', () => {
    cy.get('.carousel-btn.prev').should('be.visible');
    cy.get('.carousel-btn.next').should('be.visible');
  });

  it('should display image counter', () => {
    cy.get('.carousel-counter').should('be.visible');
    cy.get('.current-image').should('contain', '1');
    cy.get('.total-images').should('contain', '5');
  });

  it('should navigate to next image when next button is clicked', () => {
    cy.get('.carousel-container').first().within(() => {
      cy.get('.current-image').should('contain', '1');
      cy.get('.carousel-btn.next').click();
      cy.get('.current-image').should('contain', '2');
    });
  });

  it('should navigate to previous image when prev button is clicked', () => {
    cy.get('.carousel-container').first().within(() => {
      cy.get('.carousel-btn.next').click();
      cy.get('.current-image').should('contain', '2');
      cy.get('.carousel-btn.prev').click();
      cy.get('.current-image').should('contain', '1');
    });
  });

  it('should wrap around when reaching the end', () => {
    cy.get('.carousel-container').first().within(() => {
      // Click next multiple times to reach the end
      for (let i = 0; i < 5; i++) {
        cy.get('.carousel-btn.next').click();
      }
      // Should wrap back to image 1
      cy.get('.current-image').should('contain', '1');
    });
  });

  it('should wrap around when reaching the beginning', () => {
    cy.get('.carousel-container').first().within(() => {
      cy.get('.carousel-btn.prev').click();
      // Should wrap to last image (5)
      cy.get('.current-image').should('contain', '5');
    });
  });

  it('should display car details below carousel', () => {
    cy.get('.card-info h3').should('be.visible');
    cy.get('.car-details').should('be.visible');
    cy.get('.car-details strong').should('contain', 'Year');
    cy.get('.car-details strong').should('contain', 'Model');
    cy.get('.car-details strong').should('contain', 'Mileage');
    cy.get('.car-details strong').should('contain', 'VIN');
  });

  it('should display description text', () => {
    cy.get('.description').should('be.visible');
    cy.get('.description').should('not.have.text', '');
  });
});
