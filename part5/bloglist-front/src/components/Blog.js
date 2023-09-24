import { useState } from 'react'

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


  const deleteStyle = {
    color: 'red'
  }

  const toggleDetail = () => {
    setDetail(!detail)
  }

  const handleLike = () => {
    if (user.username === blog.user.username) {
      console.log('TRUEE')
    } else {
      console.log('FALSEE')
    }
    console.log('user :>> ', user)
    console.log('blog :>> ', blog.id)
    const newLikes = likes + 1
    setLikes(newLikes)
    updateLikes(blog.id, newLikes)
  }

  //eslint --disable-rule=no-console --disable-rule=no-alert

  if(user !== null) {
    return (
      <>
        {!detail ?
          <div style={blogStyle} className='blog'>
            <span className='title'>{blog.title} - </span>
            <span className='author'>{blog.author}</span>{' '}
            <button id='view-btn' onClick={toggleDetail}>view</button>
          </div> :
          <div style={blogStyle} className='blog-details'>
            {blog.title} <button onClick={toggleDetail}>hide</button> <br />
            {blog.url} <br />
              Likes {blog.likes} <button onClick={() => handleLike(blog.id)} className='like-btn'>like</button> <br />
            {blog.author}
            {<p><button style={deleteStyle} onClick={() => handleRemoveBlog(blog.id, blog.title, blog.author)} className='delete'>delete</button></p>}
          </div>
        }
      </>
    )
  }
}


export default Blog