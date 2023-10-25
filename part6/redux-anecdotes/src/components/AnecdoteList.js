import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector((state) => state.anecdotes)
	const filter = useSelector((state) => state.filter)

	const filteredAnecdotes = anecdotes.filter((anecdote) =>
		anecdote.content.toLowerCase().includes(filter.toLowerCase())
	)

	const handleVote = (id) => {
		dispatch(voteAnecdote(id))
	}

	return (
		<>
			<Filter />
			{filteredAnecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote.id)}>
								vote
							</button>
						</div>
					</div>
				))}
		</>
	)
}

export default AnecdoteList
