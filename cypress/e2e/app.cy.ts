describe('Home page', () => {
    it('Visits the homepage', () => {
        cy.visit('/');
        cy.contains('Home')
    })
});