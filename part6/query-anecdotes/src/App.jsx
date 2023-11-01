import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from "./requests"

const App = () => {

	const queryClient = useQueryClient()

	const updateAnecdoteMutation = useMutation(
		(data) => updateAnecdote({ content: data.content, id: data.id, votes: data.votes }),
		{
		  onSettled: () => {
			// Revalidação automática após a mutação
			queryClient.invalidateQueries(['anecdotes']);
		  },
		}
	  );
	  
	
	const handleVote = (anecdote) => {
		console.log("vote")
		updateAnecdoteMutation.mutate({
			content: anecdote.content,
			id: anecdote.id,
			votes: anecdote.votes + 1
		})
	}

	const result = useQuery({
		queryKey: ["anecdotes"],
		queryFn: getAnecdotes,
		retry: false,
		refetchOnWindowFocus: false,
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
