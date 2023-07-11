import {useState} from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => setDetailsVisible(!detailsVisible)

  return (  
      <div style={blogStyle}>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{ detailsVisible ? 'Hide' : 'Show' }</button></p>
        {detailsVisible && (<><p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p></>)}
      </div>  
    )
}


export default Blog