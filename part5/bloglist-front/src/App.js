import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import {
  SuccessNotification,
  ErrorNotification,
} from './components/Notification'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'
import { LoginForm } from './components/LoginForm'
import { Button } from './components/FormHelper'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setUser(null)
    } catch (exception) {
      showErrorMessage('something went wrong, try to logout again')
    }
  }

  const loginUser = (userObject) => {
    loginService
      .login(userObject)
      .then(returnedUser => {
        setUser(returnedUser)
        blogService.setToken(returnedUser.token)
        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(returnedUser)
        )
        showSuccessMessage(`Welcome ${returnedUser.name}`)
      })
      .catch(() => {
        showErrorMessage('wrong credentials')
      })
  }

  const loginView = () => {
    return (
      <div>
        <Togglable buttonLabel="Please Log in">
          <LoginForm loginUser={loginUser} />
        </Togglable>
      </div>
    )
  }
  //***************************************************************************************
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.togglableHandle()

    blogService
      .create(blogObject)
      .then((response) => {
        // assumindo que o API retorne o objeto blog com idfield

        // atualizando o localstate para incluir o novo blog
        setBlogs([...blogs, response])

        if (response) {
          // se a response é true
          showErrorMessage(
            `a new blog ${blogObject.title} by ${blogObject.author} created`
          )
        }
      })
      .catch((exception) => {
        showErrorMessage('Falha na criação do blog')
        console.log('exception :>> ', exception)
      })
  }

  const blogView = () => {
    return (
      <div>
        {showLoggedUser()}

        <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>

        <Togglable buttonLabel="Show all blogs">
          {blogs.length === 0
            ? 'Sorry, no blogs added at the moment'
            : showBlogs()}
        </Togglable>
      </div>
    )
  }

  const showLoggedUser = () => (
    <div>
      {user.name} logged in{' '}
      <Button
        style={{ cursor: 'pointer' }}
        type="button"
        onClick={handleLogout}
        text="Logout"
      />
    </div>
  )

  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h3> Click blog name for more details</h3>
        {blogs
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
              showSuccessMessage={showSuccessMessage}
              showErrorMessage={showErrorMessage}
            />)
        }

      </div>
    )
  }


  return (
    <div>

      <h2>BLOGS</h2>

      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ?
        loginView() :
        blogView()
      }

    </div>
  )
}

export default App
