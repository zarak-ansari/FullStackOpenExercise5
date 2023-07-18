describe('Blog app', function () {

  beforeEach(function (){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test-name',
      username: 'test-username12345',
      password: 'test-password'
    }
    cy.request('POST', 'http:localhost:3003/api/users', user)
  })

  describe('Login related tests', function() {
    beforeEach(function(){
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
      cy.contains('Log in')
      cy.get('#loginForm').should('exist')
    })

    it('log in succeeds with right credentials', function() {
      cy.get('#username').type('test-username12345')
      cy.get('#password').type('test-password')
      cy.get('#loginSubmit').click()

      cy.contains('Logged in user: test-name')
    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('test-username12345')
      cy.get('#password').type('test-password')
      cy.get('#loginSubmit').click()

      // Check that labels for username and password are still visible
      cy.contains('Username')
      cy.contains('Password')
    })

  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.visit('http://localhost:3000')
      cy.get('#username').type('test-username12345')
      cy.get('#password').type('test-password')
      cy.get('#loginSubmit').click()
    })

    it('can create new blogs', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Test Blog Title')
      cy.get('#author').type('Test Blog Author')
      cy.get('#url').type('Test Blog URL')
      cy.contains('Submit').click()

      cy.contains('Added new blog Test Blog Title by Test Blog Author')
    })

    describe('when blogs are created by the logged in user', function() {
      beforeEach(function() {
        for(var i = 0; i < 5; i++){
          createTestBlog(`Test Title ${i}`, `Test Author ${i}`, `Test URL ${i}`)
        }
      })

      it('can click like button for blog number 3', function() {
        cy.contains('Test Title 3').as('currentBlog')
        cy.get('@currentBlog').contains('Show').click()
        cy.get('@currentBlog').get('.likeButton').click()
        cy.get('@currentBlog').get('.blogLikes').should('contain', 'likes 1')
      })
    })
  })

})

function createTestBlog(title, author, url) {
  cy.contains('New Blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.contains('Submit').click()
}