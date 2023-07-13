import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggelable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState(null)

  const newBlogFormVisibilityRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if(loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a,b) => (a.likes - b.likes))
      setBlogs(sortedBlogs)
    }
    )
  }, [])


  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const displayNotification = (message, color) => {
    setNotificationMessage(message)
    setNotificationColor(color)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationColor(null)
    }, 5000)
  }

  const addNewBlog = async (newBlog) => {
    try {
      newBlogFormVisibilityRef.current.toggleVisibility()
      const responseBlog = await blogService.createNewBlog(newBlog)
      setBlogs(blogs.concat(responseBlog))
      displayNotification(`Added new blog ${responseBlog.title} by ${responseBlog.author}`, 'green')
    } catch (exception) {
      displayNotification('Could not add new blog', 'red')
      console.log(exception)
    }
  }

  const incrementLikesOfBlog = async (blogId, updatedBlog) => {
    await blogService.updateBlog(updatedBlog, blogId)
    const newBlogs = blogs.map(blog => {
      if(blog.id === blogId){
        return { ...blog, likes:blog.likes + 1 }
      } else {
        return blog
      }
    })
    setBlogs(newBlogs)
  }

  const removeBlog = async (blogId) => {
    if(window.confirm('Do you really want to delete the blog?')) {
      await blogService.removeBlog(blogId)
      const newBlogs = blogs.filter(blog => blog.id !== blogId)
      setBlogs(newBlogs)
    }
  }

  if (user) {
    return(
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} color={notificationColor} />
        <p>
          Logged in user: {user.name}
          <button onClick={logout}>Log Out</button>
        </p>
        <h2>Create a new Blog</h2>
        <Toggleable buttonLabel="New Blog" ref={newBlogFormVisibilityRef}>
          <NewBlogForm
            addNewBlog={addNewBlog}
          />
        </Toggleable>

        {blogs.sort((a,b) => (b.likes - a.likes)).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            incrementLikesOfBlog={incrementLikesOfBlog}
            loggedInUsername={user.username}
            removeBlog={removeBlog}
          />
        )}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={notificationMessage} color={notificationColor} />
        <LoginForm
          setUser={setUser}
          displayNotification={displayNotification}
        />
      </div>)
  }
}

export default App