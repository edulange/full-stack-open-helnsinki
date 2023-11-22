/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  setUsername,
  setPassword,
  loginUser as loginUserAction,
} from '../reducers/userReducer';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { setErrorMessage, setSuccessMessage, clearNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { username, password } = useSelector((state) => state.user);
  const navigate = useNavigate()


  const showNotification = (message, isError = false) => {
	const action = isError ? setErrorMessage : setSuccessMessage
	dispatch(action(message))
	setTimeout(() => {
		dispatch(clearNotification())
	}, 3000)
}

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
		navigate('/')
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
  );

  return (
    <>
      {!user && handleLogin()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {logOutButton()}
        </div>
      )}
    </>
  );
};

export default Login;