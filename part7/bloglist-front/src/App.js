import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


/* eslint-disable */

import { useDispatch } from 'react-redux'
import { loginUser as loginUserAction, clearUser } from './reducers/userReducer';
import { useSelector } from 'react-redux';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch()


  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          console.log('Token retrieved from localStorage:', user.token);
          blogService.setToken(user.token);
          dispatch(loginUserAction(user));
        }
      } catch (error) {
        console.error('Error during user initialization:', error);
      }
    };
  
    init();
  }, [dispatch]);


  //************************************************* Setting messages */
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  //**********************************************************************************
  // LOGIN VIEW, LOGGING IN and LOGGING OUT

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      showSuccessMessage(`Goodbye ${user.name}`)
      window.localStorage.clear()
      blogService.setToken(null)
      dispatch(clearUser())
    } catch (exception) {
      showErrorMessage('something went wrong, try to logout again')
    }

  }


  const loginUser = (event) => {
    event.preventDefault()


    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(user)
        )
        showSuccessMessage(`Welcome ${user.name}`)
        blogService.setToken(user.token)

        dispatch(loginUserAction(user));
        setUsername('')
        setPassword('')
      })
      .catch((exception) => {
        showErrorMessage('wrong username or password')
        console.log(exception)
      })
  }

  const updateLikes = (id, newLikes) => {
    blogService.update(id, { likes: newLikes }).then((updatedBlog) => {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      )
    })
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((response) => {
        // assumindo que o API retorne o objeto blog com idfield

        // atualizando o localstate para incluir o novo blog
        setBlogs([...blogs, response])

        if (response) {
          // se a response é true
          showSuccessMessage(
            `a new blog ${blogObject.title} by ${blogObject.author} created`
          )
        }
      })
      .catch((exception) => {
        showErrorMessage('Falha na criação do blog')
        console.log('exception :>> ', exception)
      })
  }

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
          setBlogs(blogs.filter((blog) => blog.id !== id))
        })
        .catch((error) => {
          console.error('Error deleting blog:', error)
        })
    }
  }

  const handleLogin = () => (
    <form onSubmit={loginUser}>
      <div>
				username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
				password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-btn' type="submit">login</button>
    </form>
  )

  const logOutButton = () => (
    <div>
      <button id='logout-btn' type="submit" onClick={handleLogout}>
				Logout
      </button>
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user && handleLogin()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {logOutButton()}
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {/* {newBlogs()} SUBSTITUIDO pelo BlogForm*/}
        </div>
      )}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updateLikes={updateLikes}
            handleRemoveBlog={handleRemoveBlog}
          />
        ))}
    </div>
  )
}

export default App
