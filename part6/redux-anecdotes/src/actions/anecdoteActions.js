const getId = () => (100000 * Math.random()).toFixed(0)

export const vote = (id) => {
    return {
      type: 'VOTE',
      payload: id
    }
  }

  export const createAnecdote = (content) => {
    return {
        type: 'NEW_ANECDOTE',
        payload: {
            content,
            id: getId(),
            votes: 0
        }
    }
  }