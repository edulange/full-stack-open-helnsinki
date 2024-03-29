import { useState } from "react"

import {
	BrowserRouter as Router,
	useParams,
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom"
import Anecdote from "./components/Anecdote"
import { useField } from "./hooks"

const Menu = () => {
	const padding = {
		paddingRight: 5,
	}
	return (
		<div>
			<Link style={padding} to="/">
				anecdotes
			</Link>
			<Link style={padding} to="/create">
				create new
			</Link>
			<Link style={padding} to="/about">
				about
			</Link>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map((anecdote) => (
				<li key={anecdote.id}>
					<Link to={`/anecdotes/${anecdote.id}`}>
						{anecdote.content}
					</Link>
				</li>
			))}
		</ul>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or
			an incident. Occasionally humorous, anecdotes differ from jokes
			because their primary purpose is not simply to provoke laughter but
			to reveal a truth more general than the brief tale itself, such as
			to characterize a person by delineating a specific quirk or trait,
			to communicate an abstract idea about a person, place, or thing
			through the concrete details of a short narrative. An anecdote is "a
			story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you
			can find the best and add more.
		</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for{" "}
		<a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
		<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
			https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
		</a>{" "}
		for the source code.
	</div>
)

const CreateNew = (props) => {
	/* aqui era 
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  */
	const content = useField("text")
	const author = useField("text")
	const info = useField("text")

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		})

		navigate("/")
	}

	const handleReset = () => {
		content.reset()
		author.reset()
		info.reset()
	}

	const getFieldProps = (field) => {
		// Create a new object with only the properties you want to spread
		const { type, value, onChange } = field
		return { type, value, onChange }
	}
	// estou utilizando isso aqui pq? para conseguir utilizar o useField
	// e assim eu posso utilizar o useField só as propriedades que eu quero

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...getFieldProps(content)} />
				</div>
				<div>
					author
					<input {...getFieldProps(author)} />
				</div>
				<div>
					url for more info
					<input {...getFieldProps(info)} />
				</div>
				<button>create</button>
				<button type="button" onClick={handleReset}>
					reset
				</button>
			</form>
		</div>
	)
	/* No lugar do ...content, é a mesma coisa que isso:				
    <input
						name="content"
						type={content.type}
						value={content.value}
						onChange={content.onChange}
					/>
				</div>
				<div>
					author
					<input
						name="author"
						type={author.type}
						value={author.value}
						onChange={author.onChange}
					/>
				</div>
				<div>
					url for more info
					<input
						name="info"
						type={info.type}
						value={info.value}
						onChange={info.onChange}
					/> */
}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: 1,
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: 2,
		},
	])

	const [notification, setNotification] = useState("")

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))

		setNotification(`Anecdote ${anecdote.content} was added to the list`)

		setTimeout(() => {
			setNotification("")
		}, 3000)
	}

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		}

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
	}

	return (
		<Router>
			<div>
				<h1>Software anecdotes</h1>
				<Menu />
				{notification && <p> {notification} </p>}
				<Routes>
					<Route
						path="/"
						element={<AnecdoteList anecdotes={anecdotes} />}
					/>
					<Route
						path="/anecdotes/:id"
						element={<Anecdote anecdotes={anecdotes} />}
					/>
					<Route path="/about" element={<About />} />
					<Route
						path="/create"
						element={<CreateNew addNew={addNew} />}
					/>
				</Routes>
				<Footer />
			</div>
		</Router>
	)
}

export default App
