/* eslint-disable */
import { useState } from 'react'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const [detail, setDetail] = useState(false)
  const dispatch = useDispatch()

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

  const handleUpdateLikes = (id, newLikes) => {
    console.log('veio do componente blog')
    blogService.update(id, { likes: newLikes })
      .then((updatedBlog) => {
        dispatch(updateBlog({ id, updatedBlog: { id, likes: newLikes } }));
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
  };


  const handleDelete = async () => {
    console.log('veio do componente blog')
    if (window.confirm(`Do you really want to delete ${blog.title} this blog?`)) {
      try {
        await blogService.remove(blog.id);
        dispatch(removeBlog(blog.id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

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
            {blog.title} <button className='hide-btn' onClick={toggleDetail}>hide</button> <br />
            {blog.url} <br />
            Likes {blog.likes} <button onClick={() => handleUpdateLikes(blog.id, blog.likes + 1)} className='like-btn'>like</button> <br />
            {blog.author}
            {user.username === blog.user.username && (
            <p><button style={deleteStyle} onClick={handleDelete} className='delete'>delete</button></p>
          )}          </div>
        }
      </>
    )
  }
}


export default Blog