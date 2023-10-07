import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"

const App = () => {
	// eslint-disable-next-line

	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App
