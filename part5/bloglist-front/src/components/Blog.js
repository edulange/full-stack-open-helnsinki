import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateLikes, handleRemoveBlog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [detail, setDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // const listStyle = {
  //   border: '1px solid #ccc',
  //   padding: '10px',
  //   marginTop: '2px',
  // }

  const deleteStyle = {
    color: 'red'
  }

  const toggleDetail = () => {
    setDetail(!detail)
  }

  const handleLike = () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    updateLikes(blog.id, newLikes)
  }

  if(user !== null) {
    return (
      <>
        {!detail ?
          <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}
            <button onClick={toggleDetail}>view</button>
          </div> :
          <div style={blogStyle} className='blogDetail'>
            {blog.title} <button onClick={toggleDetail}>hide</button> <br />
            {blog.url} <br />
              Likes {blog.likes} <button onClick={() => handleLike(blog.id)} className='like'>like</button> <br />
            {blog.author}
            {<p><button style={deleteStyle} onClick={() => handleRemoveBlog(blog.id, blog.title, blog.author)} className='delete'>delete</button></p>}
          </div>
        }
      </>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog