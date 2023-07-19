const testUsers = [
  {
    name: 'test-name0',
    username: 'test-username0',
    password: 'test-password0'
  },
  {
    name: 'test-name1',
    username: 'test-username1',
    password: 'test-password1'
  }
]

describe('Blog app', function () {

  before(function (){
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    testUsers.forEach(user => cy.createUser(user))
  })

  describe('Login related tests', function() {
    beforeEach(function(){
      cy.visit('')
    })

    it('Login form is shown', function () {
      cy.contains('Log in')
      cy.get('#loginForm').should('exist')
    })

    it('log in succeeds with right credentials', function() {
      cy.get('#username').type(testUsers[0].username)
      cy.get('#password').type(testUsers[0].password)
      cy.get('#loginSubmit').click()

      cy.contains(`Logged in user: ${testUsers[0].name}`)
    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('test-username12345')
      cy.get('#password').type('test-wrong-password')
      cy.get('#loginSubmit').click()

      // Check that labels for username and password are still visible
      cy.contains('Login Failed')
    })

  })

  describe('When users and blogs have been added to backend', function() {
    before(function(){
      cy.visit('')
      testUsers.forEach(user => {
        cy.login(user)
          .then(() => {
            for(var i=0; i<5; i++){
              const blog = {
                title: `${user.username} Test Blog Title ${i}`,
                author: `${user.username} Test Blog Author ${i}`,
                url: `${user.username}testUrl${i}`
              }
              cy.createBlog(blog)
            }
          })
          .then(() => cy.contains('Log Out').click())
      })
    })

    describe('when first user is logged in', function() {
      beforeEach(function(){
        cy.login(testUsers[0])
      })

      const blogForCurrentTest = {
        title:'Title Added From UI',
        author: 'Author Added From UI',
        url:'URL Added From UI'
      }

      it('can create new blogs', function() {
        cy.contains('New Blog').click()
        cy.get('#title').type(blogForCurrentTest.title)
        cy.get('#author').type(blogForCurrentTest.author)
        cy.get('#url').type(blogForCurrentTest.url)
        cy.contains('Submit').click()
        cy.contains(`Added new blog ${blogForCurrentTest.title} by ${blogForCurrentTest.author}`)
      })

      it('can like a blog', function() {
        cy.contains(blogForCurrentTest.title).parent().as('currentBlog')
        cy.get('@currentBlog').contains('Show').click()
        cy.get('@currentBlog').get('.likeButton').click()
        cy.get('@currentBlog').get('.blogLikes').should('contain', '1')
        cy.get('@currentBlog').contains('Hide').click()
      })

      it('can delete a specified blog', function() {
        cy.contains(blogForCurrentTest.title).parent().as('currentBlog')
        cy.get('@currentBlog').contains('Show').click()
        cy.get('@currentBlog').get('.removeBlogButton').click()
        cy.contains(blogForCurrentTest.title).should('not.exist')
      })

      it('cannot see delete button for blogs added by other users', function() {
        cy.contains(`${testUsers[1].username} Test Blog Title 0`).parent().as('currentBlog')
        cy.get('@currentBlog').contains('Show').click()
        cy.get('@currentBlog').find('.removeBlogButton').should('not.exist')
      })
    })
  })

})