import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
      // window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      console.log(exception)
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  if(user){
    return(
      <div>
        <h2>blogs</h2>
        <p>Logged in user: {user.name}</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>    
    )
  } else {
    return(<LoginForm setUser={setUser} />)
  }
}

export default App