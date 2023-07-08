describe('Logged in', () => {
  describe('Log in', () => {
    beforeEach(() => {
      cy.visit('/#/')

      cy.dataCy('loginLink').click()
      cy.dataCy('usernameField').type('cypress')
      cy.dataCy('passwordField').type('password123')
      cy.dataCy('loginSubmit').click()
    })

    it('logs in', () => {
      cy.dataCy('logoutLink').should('exist')
    })

    it('logs out', () => {
      cy.dataCy('logoutLink').click()
      cy.dataCy('loginLink').should('exist')
    })

    describe('Create episode', () => {
      beforeEach(() => cy.dataCy('uploadNewLink').click())

      it('handles validation errors', () => {
        cy.dataCy('titleField').type(' ')
        cy.dataCy('descriptionField').type('Unpublished episode description')
        cy.fixture('script.md').then((script: string) => {
          cy.get('#episode_script').type(script.slice(0, 100))
        })
        cy.dataCy('podcastSubmitButton').click()
        cy.dataCy('titleField').get('.errors>li').should('contain', 'Please give this episode a title.')
      })

      it('creates an unpublished episode', () => {
        cy.dataCy('titleField').find('input').type('Test Unpublished Episode')
        cy.dataCy('descriptionField').type('Unpublished episode description')
        cy.dataCy('podcastSubmitButton').click()
        // cy.dataCy('spinner').should('not.exist')
        // cy.dataCy('homeLink').click()
        cy.location('hash').should('eql', '#/')
        cy.dataCy('episode').its('length').should('eql', 3)
        cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Test Unpublished Episode')
      })

      it('creates and publishes an episode', () => {
        cy.dataCy('titleField').type('Test Published episode')
        cy.dataCy('descriptionField').type('Published episode description')
        cy.fixture('script.md').then((script: string) => {
          cy.get('#episode_script').type(script.slice(0, 100))
        })
        cy.fixture('image.jpg', 'base64').then(data => {
          cy.dataCy('imageField').find('input').attachFile({
            fileContent: data,
            filePath: 'image.jpg',
            encoding: 'base64',
            mimeType: 'image/jpeg'
          }, { subjectType: 'input' })
        })
        cy.fixture('audio.aif', 'base64').then(data => {
          cy.dataCy('audioField').find('input').attachFile({
            fileContent: data,
            filePath: 'audio.aif',
            encoding: 'base64',
            mimeType: 'audio/aiff'
          }, { subjectType: 'input' })
        })
        cy.dataCy('podcastSubmitButton').click()

        cy.dataCy('episode').its('length').should('eql', 3)
        cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Test Published episode')

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(15000) // wait for processing to complete
        cy.reload()

        cy.dataCy('playButton').should('exist')
      })
    })

    describe('Edit episode', () => {
      beforeEach(() => cy.get('[data-cy=episode] [data-cy=editButton]').first().click())

      it('handles validation errors', () => {
        cy.dataCy('titleField').find('input').clear()
        cy.dataCy('titleField').find('input').type(' ')
        cy.dataCy('podcastSubmitButton').click()

        cy.dataCy('titleField').get('.errors>li').should('contain', 'Please give this episode a title.')
      })

      it('edits an episode', () => {
        cy.dataCy('descriptionField').find('textarea').type('New description')
        cy.dataCy('podcastSubmitButton').click()
        cy.dataCy('homeLink').click()
        cy.location('hash').should('eql', '#/')
        cy.dataCy('episode').first().dataCy('episodeDescription').should('contain', 'New description')
      })
    })

    describe('Record episode', () => {
      beforeEach(() => cy.get('[data-cy=episode] [data-cy=performButton]').first().click())

      it('displays the Script page', () => {
        cy.dataCy('runningTime').should('contain', 'Estimated running time: 1:11')
      })
    })
  })
})
