import { useState } from 'react'
import PropTypes from 'prop-types'

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

  const incrementLikes = () => {

    const updatedBlog = { ...blog }
    updatedBlog.user = blog.user.id
    updatedBlog.likes = blog.likes + 1
    delete updatedBlog.id
    props.incrementLikesOfBlog(blog.id, updatedBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    props.removeBlog(blog.id)
  }

  return (
    <div className='blog' id={blog.id} style={blogStyle}>
      <p className="blogTitleAndAuthor">{blog.title} - {blog.author} <button onClick={toggleVisibility}>{ detailsVisible ? 'Hide' : 'Show' }</button></p>
      {detailsVisible &&
        (<div className='expandedBlog'>
          <p className="blogUrl">{blog.url}</p>
          <p className="blogLikes">likes {blog.likes} <button onClick={incrementLikes} className='likeButton'>like</button></p>
          <p className="blogUsername">{blog.user.name}</p>
          {(blog.user.username === props.loggedInUsername) && (<button className='removeBlogButton' onClick={removeBlog}>Remove</button>)}
        </div>)}
    </div>
  )
}

Blog.prototypes = {
  key : PropTypes.string.isRequired,
  blog : PropTypes.object.isRequired,
  incrementLikesOfBlog : PropTypes.func.isRequired,
  loggedInUsername : PropTypes.string.isRequired,
  removeBlog : PropTypes.func.isRequired
}

export default Blog