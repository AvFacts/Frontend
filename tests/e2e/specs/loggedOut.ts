describe('Logged out', () => {
  beforeEach(() => cy.visit('/#/'))

  it('rejects an invalid login', () => {
    cy.dataCy('loginLink').click()

    cy.dataCy('usernameField').type('cypress')
    cy.dataCy('passwordField').type('wrong')
    cy.dataCy('loginSubmit').click()

    cy.dataCy('loginError').should('contain', 'Error: Incorrect login or password')
  })

  it('displays a list of published episodes', () => {
    cy.dataCy('episode').its('length').should('eql', 1)
    cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Published episode')
  })

  it('displays the permalink for an episode', () => {
    cy.dataCy('episode').first().dataCy('permalink').click()
    cy.location('hash').should('eql', '#/episodes/2/Published-episode')
    cy.dataCy('episodeShow').should('exist')
  })

  it('filters episodes', () => {
    cy.dataCy('filterField').type('published')
    cy.dataCy('episode').its('length').should('eql', 1)
    cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Published episode')
    cy.dataCy('noEpisodes').should('not.exist')

    cy.dataCy('filterField').clear()
    cy.dataCy('filterField').type('raspberries')
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
    cy.dataCy('editButton').should('not.exist')
    cy.visit('/#/episodes/2/edit')
    cy.dataCy('404').should('exist')
  })

  it('cannot perform episodes', () => {
    cy.dataCy('performButton').should('not.exist')
    cy.visit('/#/episodes/2/script')
    cy.dataCy('404').should('exist')
  })

  it('displays the About page', () => {
    cy.visit('/#/about')
    cy.dataCy('about').should('exist')
  })
})
