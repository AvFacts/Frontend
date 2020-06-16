describe('Logged in', () => {
  describe('Log in', () => {
    it('rejects an invalid login', () => {
      cy.request('/cypress/reset')
      cy.clearLocalStorage()

      cy.visit('/#/')
      cy.dataCy('loginLink').click()
      cy.dataCy('usernameField').type('cypress')
      cy.dataCy('passwordField').type('wrong')
      cy.dataCy('loginSubmit').click()

      cy.dataCy('loginError').should('contain', 'Error: Incorrect login or password')
    })

    it('logs in an admin', () => {
      cy.dataCy('passwordField').clear().type('password123')
      cy.dataCy('loginSubmit').click()
      cy.dataCy('logoutLink').should('exist')
    })
  })

  describe('Create episode', () => {
    it('handles validation errors', () => {
      cy.dataCy('uploadNewLink').click()
      cy.dataCy('titleField').type(' ')
      cy.dataCy('descriptionField').type('Unpublished episode description')
      cy.fixture('script.md').then((script: string) => {
        cy.get('.CodeMirror').type(script.slice(0, 100))
      })
      cy.dataCy('podcastSubmitButton').click()
      cy.dataCy('titleField').get('.errors>li')
        .should('contain', 'Please give this episode a title.')
    })

    it('creates an unpublished episode', () => {
      cy.dataCy('titleField').find('input').clear().type('Unpublished Episode')
      cy.dataCy('podcastSubmitButton').click()
      // cy.dataCy('spinner').should('not.exist')
      // cy.dataCy('homeLink').click()
      cy.location('hash').should('eql', '#/')
      cy.dataCy('episode').its('length').should('eql', 1)
      cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Unpublished Episode')
    })

    it('creates and publishes an episode', () => {
      cy.dataCy('uploadNewLink').click()
      cy.dataCy('titleField').type('Published episode')
      cy.dataCy('descriptionField').type('Published episode description')
      cy.fixture('script.md').then((script: string) => {
        cy.get('.CodeMirror').type(script.slice(0, 100))
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

      cy.dataCy('episode').its('length').should('eql', 2)
      cy.dataCy('episode').first().dataCy('episodeTitle').should('contain', 'Published episode')

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(15000) // wait for processing to complete
      cy.reload()

      cy.dataCy('playButton').should('exist')
    })
  })

  describe('Edit episode', () => {
    it('handles validation errors', () => {
      cy.dataCy('episode').first().dataCy('editButton').click()
      cy.dataCy('descriptionField').find('textarea').clear().type(' ')
      cy.dataCy('podcastSubmitButton').click()

      cy.dataCy('titleField').get('.errors>li')
        .should('contain', 'Please write a short description of this episode.')
    })

    it('edits an episode', () => {
      cy.dataCy('descriptionField').find('textarea').clear().type('New description')
      cy.dataCy('podcastSubmitButton').click()
      cy.dataCy('homeLink').click()
      cy.location('hash').should('eql', '#/')
      cy.dataCy('episode').first().dataCy('episodeDescription').should('contain', 'New description')
    })
  })

  describe('Record episode', () => {
    it('displays the Script page', () => {
      cy.dataCy('episode').first().dataCy('performButton').click()
      cy.dataCy('runningTime').should('contain', 'Estimated running time: 1:15')
    })
  })
})
