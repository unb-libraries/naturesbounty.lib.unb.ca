const host = 'https://naturesbounty.lib.unb.ca'
describe("Nature's Bounty", {baseUrl: host, groups: ['sites']}, () => {

  context('Front page', {baseUrl: host}, () => {
    beforeEach(() => {
      cy.visit('/')
      cy.title()
        .should('contain', "Nature's Bounty")
    })

    specify('Menu should contain link to gallery page', () => {
      cy.get('header nav')
        .contains('Gallery')
        .its('0.href')
        .should('match', /.*\/gallery/)
    });
  })

  context('Gallery page', {baseUrl: `${host}/gallery`}, () => {
    beforeEach(() => {
      cy.visit('')
      cy.title()
        .should('contain', 'Gallery')
    })

    specify('12+ images should be displayed', () => {
      cy.get('.field--items img')
        .should('have.lengthOf.at.least', 12)
    });
  })

})
