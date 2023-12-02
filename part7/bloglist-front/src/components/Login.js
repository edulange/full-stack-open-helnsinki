/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setUsername, setPassword, loginUser as loginUserAction } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setErrorMessage, setSuccessMessage, clearNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.user)
	const { username, password } = useSelector((state) => state.user)
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
			const goodbyeMessage = user ? `Goodbye ${user.name}` : 'Logout successful'

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
				window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
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
		<form className='max-w-md mx-auto my-8' onSubmit={loginUser}>
			<div className='mb-4'>
				<label htmlFor='username' className='block text-sm font-medium text-gray-600'>
					Username
				</label>
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => dispatch(setUsername(target.value))}
					className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300'
				/>
			</div>
			<div className='mb-4'>
				<label htmlFor='password' className='block text-sm font-medium text-gray-600'>
					Password
				</label>
				<input
					id='password'
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => dispatch(setPassword(target.value))}
					className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300'
				/>
			</div>
			<button
				id='login-btn'
				type='submit'
				className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
			>
				Login
			</button>
		</form>
	)

	const logOutButton = () => (
		<div>
			<button type='submit' onClick={handleLogout}>
				Logout
			</button>
		</div>
	)

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
	)
}

export default Login
