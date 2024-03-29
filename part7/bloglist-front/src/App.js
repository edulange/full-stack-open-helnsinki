import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import blogService from './services/blogs'
import useUserInitialization from './components/userInitialization'

import Login from './components/Login'
import Header from './components/Header'
import BlogSection from './components/BlogSection'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import { SuccessNotification, ErrorNotification } from './components/Notification'

/* eslint-disable */

import { Routes, Route, Navigate } from 'react-router-dom'

import { setBlogs } from './reducers/blogReducer'
import View from './components/View'

const App = () => {
	//const [username, setUsername] = useState('')
	//const [password, setPassword] = useState('')
	//const [user, setUser] = useState(null)
	//não é mais necessário pois estou utilizando useSelector

	const dispatch = useDispatch()

	const user = useSelector((state) => state.user.user)
	const notifications = useSelector((state) => state.notifications)
	//const blogs = useSelector((state) => state.blog.blogs)
	//const { username, password } = useSelector((state) => state.user) //mesma coisa que as duas linhas de baixo
	//const username = useSelector(state => state.user.username);
	//const password = useSelector(state => state.user.password);

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
			dispatch(setBlogs(sortedBlogs))
		})
	}, [])

	useUserInitialization()
	//aqui era o useEffect que cuidava da inicialização

	return (
		<div>
			{user ? <Header /> : null}
			<ErrorNotification message={notifications.errorMessage} />
			<SuccessNotification message={notifications.successMessage} />
			<Login />
			<Routes>
				<Route path='/' element={<BlogSection />} />
				<Route path='/users' element={<Users />} />
				<Route path='/users/:id' element={<UserBlogs />} />
				<Route path='/blogs/:id' element={<View />} />
				{user ? null : <Route path='/users' element={<Navigate to='/' />} />}
			</Routes>
		</div>
	)
}

export default App
