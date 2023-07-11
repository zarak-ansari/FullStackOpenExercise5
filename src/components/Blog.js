import {useState} from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = (props) => {
  const blog = props.blog
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => setDetailsVisible(!detailsVisible)

  const incrementLikes = async () => {
    
    const updatedBlog = {...blog}
    updatedBlog.user = blog.user.id
    updatedBlog.likes = blog.likes + 1
    delete updatedBlog.id
    const response = await blogService.updateBlog(updatedBlog, blog.id)
    props.incrementLikesOfBlog(blog.id)
    console.log(response)
  }

  return (
      <div style={blogStyle}>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{ detailsVisible ? 'Hide' : 'Show' }</button></p>
        {detailsVisible && (<><p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={incrementLikes}>like</button></p>
        <p>{blog.user.name}</p></>)}
        <p>{JSON.stringify(blog)}</p>
      </div>  
    )
}


export default Blog