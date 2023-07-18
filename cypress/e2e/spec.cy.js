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
    })
  })

})