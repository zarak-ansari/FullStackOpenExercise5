import { useState } from 'react'

const NewBlogForm = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const createNewBlog = async (event) =>{
      event.preventDefault()
      try{
        props.addNewBlog({title, author, url, })
        setTitle('')
        setAuthor('')
        setUrl('')
      } catch (exception) {
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