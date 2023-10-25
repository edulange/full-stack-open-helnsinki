import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"



const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		vote(state, action) {
			const id = action.payload
			const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
			if (anecdoteToVote) {
				const updatedAnecdote = {
					...anecdoteToVote,
					votes: anecdoteToVote.votes + 1,
				}

				console.log(state) //não funciona
				console.log(JSON.parse(JSON.stringify(state))) //funciona

				return state.map((anecdote) =>
					anecdote.id === id ? updatedAnecdote : anecdote
				)
			}
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	},
})

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll90
		dispatch(setAnecdotes(anecdotes))
	}
}
export default anecdoteSlice.reducer

/*
export const vote = (id) => {
	return {
		type: "VOTE",
		payload: id,
	}
}

export const createAnecdote = (content) => {
	return {
		type: "NEW_ANECDOTE",
		payload: {
			content,
			id: getId(),
			votes: 0,
		},
	}
} */

/*
const anecdoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case "NEW_ANECDOTE":
			return [...state, action.payload]
		case "VOTE":
			const id = action.payload
			const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
			if (anecdoteToVote) {
				const updatedAnecdote = {
					...anecdoteToVote,
					votes: anecdoteToVote.votes + 1,
				}
				return state.map((anecdote) =>
					anecdote.id === id ? updatedAnecdote : anecdote
				)
			}
			return state

		default:
			return state
	}
}

export default anecdoteReducer */
