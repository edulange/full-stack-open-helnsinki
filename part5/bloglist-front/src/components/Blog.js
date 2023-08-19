import { useState } from 'react'
import View from './View'

const Blog = ({ blog, user, updateLikes, handleRemoveBlog }) => {
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const listStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    marginTop: '2px',
  }

  const handleLike = () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    updateLikes(blog.id, newLikes)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div style={listStyle}>
        <View buttonLabel="View">
          <p>{blog.url}</p>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>
						Likes {likes} <button onClick={handleLike}>Like</button>
          </p>
        </View>
        {/* Conditionally render the delete button */}
        {user && blog.user && user.username === blog.user.username && (
          <button onClick={() => handleRemoveBlog(blog.id)}>Delete</button>
        )}
      </div>
    </div>
  )
}

export default Blog

console.log(`teste`)