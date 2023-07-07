import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, color }) => {

  const styles = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if(message){
    return (
      <div style={styles}>
        {message}
      </div>
    )
  }
}

const LoginForm = (props) => {


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      props.setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      props.displayNotification('Successfully logged in', 'green')
    } catch (exception) {
      props.displayNotification('Invalid username or password', 'red')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input 
          id="username"
          type="text"
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password" 
          type="password"
          value={password}
          onChange={ ({target}) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
  </div>
  )
}

const NewBlogForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const createNewBlog = async (event) =>{
    event.preventDefault()
    const newBlog = { title, author, url, }
    try {
      console.log(window.localStorage.getItem('user'))
      const responseBlog = await blogService.createNewBlog(newBlog)
      props.setBlogs(props.blogs.concat(responseBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      props.displayNotification(`Added new blog ${responseBlog.title} by ${responseBlog.author}`, 'green')
    } catch (exception) {
      props.displayNotification('Could not add new blog', 'red')
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={createNewBlog}>
        <label htmlFor='title'>Title</label>
        <input 
          name='title'
          type='text'
          value={title}
          onChange={({target})=>setTitle(target.value)}
        />
        <label htmlFor='author'>Author</label>
        <input 
          name='author'
          type='text'
          value={author}
          onChange={({target})=>setAuthor(target.value)}
        />
        <label htmlFor='url'>URL</label>
        <input 
          name='url'
          type='text'
          value={url}
          onChange={({target})=>setUrl(target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if(loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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


  if(user){
    return(
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} color={notificationColor} />
        <p>
          Logged in user: {user.name}
          <button onClick={logout}>Log Out</button>
        </p>
        <NewBlogForm 
          blogs={blogs}
          setBlogs={setBlogs}
          displayNotification={displayNotification}
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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