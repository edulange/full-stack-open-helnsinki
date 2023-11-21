import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
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

	//**********************************************************************************
	// LOGIN VIEW, LOGGING IN and LOGGING OUT

	const handleLogout = async (event) => {
		event.preventDefault()

		try {
			const goodbyeMessage = user
				? `Goodbye ${user.name}`
				: 'Logout successful'

			showNotification(goodbyeMessage)
			window.localStorage.clear()
			blogService.setToken(null)
			dispatch(clearUser())
		} catch (exception) {
			showNotification('Something went wrong, try to logout again', true)
		}
	}

	const loginUser = (event) => {
		event.preventDefault()

		loginService
			.login({ username, password })
			.then((user) => {
				window.localStorage.setItem(
					'loggedBlogAppUser',
					JSON.stringify(user)
				)
				showNotification(`Welcome ${user.name}`)
				blogService.setToken(user.token)

				dispatch(loginUserAction(user))
			})
			.catch((exception) => {
				showNotification('wrong username or password', true)
				console.log(exception)
			})
	}

	/*   FOI PARA O COMPONENTE BLOG

    const handleRemoveBlog = (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Do you really want to delete ${blogToDelete.title} this blog?`
      )
    ) {
      blogService
        .remove(id)
        .then(() => {
          // Atualizar o estado para refletir a exclusão do blog
          dispatch(removeBlog(id))
        })
        .catch((error) => {
          console.error('Error deleting blog:', error)
        })
    }
  }

  const updateLikes = (id, newLikes) => {
    blogService.update(id, { likes: newLikes })
    .then((updatedBlog) => {
      dispatch(updateBlog({ id, updatedBlog: { id, likes: newLikes } }));
      })
      .catch((error) => {
        console.error('Error updating likes:', error);
      });
  }; 
  */

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

	const handleLogin = () => (
		<form onSubmit={loginUser}>
			<div>
				username
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) =>
						dispatch(setUsername(target.value))
					}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) =>
						dispatch(setPassword(target.value))}
				/>
			</div>
			<button id='login-btn' type='submit'>
				login
			</button>
		</form>
	)

	const logOutButton = () => (
		<div>
			<button id='logout-btn' type='submit' onClick={handleLogout}>
				Logout
			</button>
		</div>
	)

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
      <AuthenticationSection user={user} handleLogin={handleLogin} logOutButton={logOutButton}/>
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

