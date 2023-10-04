import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from './actions/anecdoteActions'

const App = () => {
  const anecdotes = useSelector(state => state)
  // eslint-disable-next-line
  const dispatch = useDispatch()

  const handleVote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App