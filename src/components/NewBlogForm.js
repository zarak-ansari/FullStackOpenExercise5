import { useState } from 'react'

import blogService from '../services/blogs'

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

export default NewBlogForm