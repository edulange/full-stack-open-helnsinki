import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests"

const App = () => {
  const queryClient = useQueryClient()

	const handleVote = (anecdote) => {
		console.log("vote")
	}


  const updateAnecdoteMutatition = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
    retry: false,
        refetchOnWindowFocus: false
	})
	console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>Carregando dados</div>
  }
	if (result.isError) {
		return <div>anecdote service is not available</div>
	}
	const anecdotes = result.data || null

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes !== null ? (
				anecdotes.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => handleVote(anecdote)}>
								vote
							</button>
						</div>
					</div>
				))
			) : (
				<div>Carregando dados...</div>
			)}
		</div>
	)
}

export default App
