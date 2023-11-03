import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../request"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const dispatch = useNotificationDispatch()

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(["anecdotes"])
			queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote])
		},
	})

	const getId = () => Number(100000 * Math.random()).toFixed(0)

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		newAnecdoteMutation.mutate(
			{ content, id: getId(), votes: 0 },
			{
				onSuccess: () => {
					dispatch({
						type: "showNotification",
						payload: `you added ${content} !`,
					})
					setTimeout(() => {
						dispatch({ type: "hideNotification" })
					}, 5000)
				},
				onError: () => {
					dispatch({
						type: "ERROR",
						payload: `too short anecdote, must have legnth 5 or more`,
					})
					setTimeout(() => {
						dispatch({ type: "hideNotification" })
					}, 5000)
				},
			}
		)
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
