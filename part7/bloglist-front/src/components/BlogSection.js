/* eslint-disable */
import { useRef } from 'react';
import Blog from './Blog';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import { useDispatch, useSelector } from 'react-redux';


import blogService from '../services/blogs';
import { addBlog as adicionarBlog } from '../reducers/blogReducer';
import { setErrorMessage, setSuccessMessage, clearNotification } from '../reducers/notificationReducer';



const BlogSection = () => {
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user.user);
	const blogs = useSelector((state) => state.blog.blogs)
  const dispatch = useDispatch()

  const showNotification = (message, isError = false) => {
		const action = isError ? setErrorMessage : setSuccessMessage
		dispatch(action(message))
		setTimeout(() => {
			dispatch(clearNotification())
		}, 3000)
	}


const addBlog = (blogObject) => {
  blogFormRef.current.toggleVisibility()
  blogService
    .create(blogObject)
    .then((response) => {
      dispatch(adicionarBlog(response))
      if (response) {
        showNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} created`
        )
      }
    })
    .catch((exception) => {
      showNotification('Falha na criação do blog', true)
      console.error(exception)
    })
    console.log('veio do componente BlogSection')
}


return (
  <>
    {user && (
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )}
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
  </>
);

}
export default BlogSection;
