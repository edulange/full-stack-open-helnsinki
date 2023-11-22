import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import useUserInitialization from './components/userInitialization'

import AuthenticationSection from './components/AuthenticationSection'
import BlogSection from './components/BlogSection'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import {
  SuccessNotification,
  ErrorNotification,
} from './components/Notification'
//import Blog from './components/Blog'
//import BlogForm from './components/BlogForm'
//import Togglable from './components/Togglable'

/* eslint-disable */

import { Routes, Route, Link, Navigate } from 'react-router-dom'

import {
	loginUser as loginUserAction,
	clearUser,
	setPassword,
	setUsername,
} from './reducers/userReducer'
import {
	setSuccessMessage,
	setErrorMessage,
	clearNotification,
} from './reducers/notificationReducer'
import { setBlogs, addBlog as adicionarBlog } from './reducers/blogReducer'

const App = () => {
	//const [username, setUsername] = useState('')
	//const [password, setPassword] = useState('')
	//const [user, setUser] = useState(null)
	//não é mais necessário pois estou utilizando useSelector

	const blogFormRef = useRef()

	const dispatch = useDispatch()


	const user = useSelector((state) => state.user.user)
	const notifications = useSelector((state) => state.notifications)
	const blogs = useSelector((state) => state.blog.blogs)
	const { username, password } = useSelector((state) => state.user) //mesma coisa que as duas linhas de baixo
	//const username = useSelector(state => state.user.username);
	//const password = useSelector(state => state.user.password);

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
			dispatch(setBlogs(sortedBlogs))
		})
	}, [])

	useUserInitialization()
	//aqui era o useEffect que cuida da inicialização

	//************************************************* Setting messages */
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
	}

	const padding = {
		padding: 5,
	}

	return (
	    <div>
      {user ? (
        <div>
          <Link style={padding} to='/'>Home</Link>
          <Link style={padding} to='/'>Blogs</Link>
          <Link style={padding} to='/users'>Users</Link>
        </div>
      ) : null}
      <h2>Blogs</h2>
      <ErrorNotification message={notifications.errorMessage} />
      <SuccessNotification message={notifications.successMessage} />
      <AuthenticationSection/>
      <Routes>
        <Route path='/' element={<BlogSection blogs={blogs} user={user} blogFormRef={blogFormRef} addBlog={addBlog}/>}/>
        <Route path='/users'element={<Users />}/>
        <Route path='/users/:id'element={<UserBlogs />}/>
        {user ? null : <Route path='/users' element={<Navigate to='/'/>}/>}
      </Routes>
    </div>
	  );
}

export default App

