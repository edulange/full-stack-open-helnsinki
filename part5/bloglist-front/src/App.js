import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const [newBlogTitle, setNewBlogTitle] = useState("");
	const [newBlogAuthor, setNewBlogAuthor] = useState("");
	const [newBlogUrl, setNewBlogUrl] = useState("");

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

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		const newBlog = {
			title: newBlogTitle,
			author: newBlogAuthor,
			url: newBlogUrl,
		};

		try {
			// faz uma chamada API para o servidorbackend para adcionar um novo blog
			const response = await blogService.create(newBlog);
			// assumindo que o API retorne o objeto blog com idfield

			//atualizando o localstate para incluir o novo blog
			setBlogs([...blogs, response]);

			//limpando os campos após ser adicionado com sucesso
			setNewBlogTitle("");
			setNewBlogAuthor("");
			setNewBlogUrl("");
			
			if (response) { // se a response é true
				setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} created`)
				setTimeout( () => {
					setErrorMessage(null);
				}, 5000)
			}
		} catch (exception) {
			console.log('teste')
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

	const newBlogs = () => (
		<>
			<h2>Create a new blog</h2>
			<form onSubmit={handleCreateBlog}>
				<div>
					<div>
						Title:{" "}
						<input
							type="text"
							name="Title"
							value={newBlogTitle}
							onChange={({ target }) =>
								setNewBlogTitle(target.value)
							}
						/>
					</div>
					<div>
						Author:{" "}
						<input
							type="text"
							name="Author"
							value={newBlogAuthor}
							onChange={({ target }) =>
								setNewBlogAuthor(target.value)
							}
						/>
					</div>
					<div>
						Url:{" "}
						<input
							type="text"
							name="Url"
							value={newBlogUrl}
							onChange={({ target }) =>
								setNewBlogUrl(target.value)
							}
						/>
					</div>
					<button type="submit">Create</button>
				</div>
			</form>
		</>
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
					{newBlogs()}
				</div>
			)}

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
