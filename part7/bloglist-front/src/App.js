import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import useUserInitialization from './components/userInitialization'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { SuccessNotification, ErrorNotification } from './components/Notification'


/* eslint-disable */



import { loginUser as loginUserAction, clearUser, setPassword, setUsername } from './reducers/userReducer';
import { setSuccessMessage, setErrorMessage, clearNotification } from './reducers/notificationReducer'
import { setBlogs, addBlog as adicionarBlog, updateBlog, removeBlog } from './reducers/blogReducer'


const App = () => {

  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  //não é mais necessário pois estou utilizando userReducer

  const blogFormRef = useRef()
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user);
  const notifications = useSelector((state) => state.notifications)
  const { username, password } = useSelector(state => state.user);
  const blogs = useSelector((state => state.blog.blogs))
  //const username = useSelector(state => state.user.username);
  //const password = useSelector(state => state.user.password);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs));
    })
  }, [])

  useUserInitialization()
  //aqui era o useEffect que cuida da inicialização

  //************************************************* Setting messages */
  const showSuccessMessage = (message) => {
    dispatch(setSuccessMessage(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  }
  
  const showErrorMessage = (message) => {
    dispatch(setErrorMessage(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  }

  //**********************************************************************************
  // LOGIN VIEW, LOGGING IN and LOGGING OUT

  const handleLogout = async (event) => {
    event.preventDefault();
  
    try {
      if (user) {
        showSuccessMessage(`Goodbye ${user.name}`);
      } else {
        showSuccessMessage('Logout successful');
      }
  
      window.localStorage.clear();
      blogService.setToken(null);
      dispatch(clearUser());
    } catch (exception) {
      showErrorMessage('Something went wrong, try to logout again');
    }
  };

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
         //aqui tinha o setUsername('')
         //aqui tinha o setPassword('')
         //eu tirei e o código continuou funcionando, aparentemente está tudo ok.
         //não faz sentido deletar o username, pois ele é necessário
      })
      .catch((exception) => {
        showErrorMessage('wrong username or password')
        console.log(exception)
      })
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
  
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((response) => {
        dispatch(adicionarBlog(response))
        //dispatch(setBlogs([...blogs, response]))  -> dava na mesma
        //no entanto não teria um reducer específico
        if (response) {
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
          dispatch(removeBlog(id))
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
          onChange={({ target }) => dispatch(setUsername(target.value))}
          />
      </div>
      <div>
				password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
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
      <ErrorNotification message={notifications.errorMessage} />
      <SuccessNotification message={notifications.successMessage} />
      {!user && handleLogin()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {logOutButton()}
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {[...blogs]
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
