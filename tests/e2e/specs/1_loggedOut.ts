describe('Logged out', () => {
  it('logs out', () => {
    cy.dataCy('logoutLink').click()
    cy.dataCy('loginLink').should('exist')
  })

  it('displays a list of published episodes', () => {
    cy.visit('/#/')
    cy.dataCy('episode').its('length').should('eql', 1)
    cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Published episode')
  })

  it('displays the permalink for an episode', () => {
    cy.dataCy('episode').first().dataCy('permalink').click()
    cy.location('hash').should('eql', '#/episodes/2/Published-episode')
    cy.dataCy('episodeShow').should('exist')
  })

  it('filters episodes', () => {
    cy.visit('/#/')

    cy.dataCy('filterField').type('published')
    cy.dataCy('episode').its('length').should('eql', 1)
    cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Published episode')
    cy.dataCy('noEpisodes').should('not.exist')

    cy.dataCy('filterField').clear().type('raspberries')
    cy.dataCy('noEpisodes').should('exist')

    cy.dataCy('filterField').clear()
    cy.dataCy('episode').its('length').should('eql', 1)
    cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Published episode')
    cy.dataCy('noEpisodes').should('not.exist')
  })

  it('cannot create episodes', () => {
    cy.dataCy('uploadNewLink').should('not.exist')
    cy.visit('/#/upload')
    cy.dataCy('404').should('exist')
  })

  it('cannot edit episodes', () => {
    cy.visit('/#/')
    cy.dataCy('editButton').should('not.exist')
    cy.visit('/#/episodes/2/edit')
    cy.dataCy('404').should('exist')
  })

  it('cannot perform episodes', () => {
    cy.visit('/#/')
    cy.dataCy('performButton').should('not.exist')
    cy.visit('/#/episodes/2/script')
    cy.dataCy('404').should('exist')
  })

  it('displays the About page', () => {
    cy.visit('/#/about')
    cy.dataCy('about').should('exist')
  })
})
