describe('Navigation', () => {
    it('should navigate to the documentation page', () => {
        cy.visit('http://localhost:3000/')

        cy.get('a[href*="documentation"]').click()

        cy.url().should('include','/documentation')

        cy.contains('Documentation')
    })
});