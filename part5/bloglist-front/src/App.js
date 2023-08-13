import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [message, setErrorMessage] = useState(null);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
			setBlogs(sortedBlogs)
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);


	  //seta mensagem de erro no status
	  //depois de 2 segs limpa
  
	  const showMessage = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
		  setErrorMessage(null)
		}, 3000)
	  }

	const updateLikes = (id, newLikes) => {
		blogService.update(id, { likes: newLikes }).then((updatedBlog) => {
		  setBlogs((prevBlogs) =>
			prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
		  );
		});
	  };


	const handleLogin = (event) => {
		event.preventDefault();
	
		loginService.login({
			username,
			password,
		})
		.then((user) => {
			window.localStorage.setItem(
				"loggedNoteappUser",
				JSON.stringify(user)
			);
	
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		})
		.catch((exception) => {
			showMessage("wrong username or password");
			console.log(exception)
		});
	};
	

	const addBlog = (blogObject) => {
		blogService.create(blogObject)
			.then((response) => {
				// assumindo que o API retorne o objeto blog com idfield
				
				// atualizando o localstate para incluir o novo blog
				setBlogs([...blogs, response]);
	
				if (response) {
					// se a response é true
					showMessage(
						`a new blog ${blogObject.title} by ${blogObject.author} created`
					);
				}
			})
			.catch((exception) => {
				showMessage("Falha na criação do blog");
				console.log('exception :>> ', exception);
			});
	};

	const handleRemoveBlog = (id) => {
		const blogToDelete = blogs.find(blog => blog.id === id)
		if (window.confirm(`Do you really want to delete ${blogToDelete.title} this blog?`)) {
		  blogService.remove(id)
			.then(() => {
			  // Atualizar o estado para refletir a exclusão do blog
			  setBlogs(blogs.filter(blog => blog.id !== id));
			})
			.catch(error => {
			  console.error("Error deleting blog:", error);
			});
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
			<Notification message={message} />
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
				<Blog key={blog.id} blog={blog} updateLikes={updateLikes} handleRemoveBlog={handleRemoveBlog}/>
			))}
		</div>
	);
};

export default App;
