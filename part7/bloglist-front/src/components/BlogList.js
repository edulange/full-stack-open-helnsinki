/* eslint-disable */
import { Link } from 'react-router-dom'

const Blog = ({ blog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }


  if (user !== null) {
    return (
      <>
          <div style={blogStyle} className="blog">
            <span className="title">{blog.title} - </span>
            <span className="author">{blog.author}</span>{' '}
            <Link to={`/blogs/${blog.id}`}><button id="view-btn">
              view
            </button></Link>
          </div>
      </>
    )
  }
}


export default Blog