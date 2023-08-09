import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				"loggedNoteappUser",
				JSON.stringify(user)
			);

			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("wrong username or password");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		try {
			// faz uma chamada API para o servidorbackend para adcionar um novo blog
			const response = await blogService.create(blogObject);
			// assumindo que o API retorne o objeto blog com idfield

			//atualizando o localstate para incluir o novo blog
			setBlogs([...blogs, response]);

			if (response) {
				// se a response é true
				setErrorMessage(
					`a new blog ${blogObject.title} by ${blogObject.author} created`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			}
		} catch (exception) {
			setErrorMessage("Falha na criação do blog");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};


	const handleLogout = (event) => {
		window.localStorage.clear();
		setUser(null);
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const logOutButton = () => (
		<div>
			<button type="submit" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={errorMessage} />
			{!user && loginForm()}
			{user && (
				<div>
					<p>{user.name} logged in</p>
					{logOutButton()}
					<Togglable buttonLabel="New Blog">
						<BlogForm createBlog={addBlog} />
					</Togglable>
					{/* {newBlogs()} SUBSTITUIDO pelo BlogForm*/} 
				</div>
			)}

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
