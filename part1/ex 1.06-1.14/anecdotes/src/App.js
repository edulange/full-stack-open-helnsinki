import { useState } from 'react'


const Button = ({ text, onClick}) => <button onClick={onClick}>{text}</button>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
 
  const [selected, setSelected] = useState(0)
  //tudo que precis ficar re-renderizando, eu preciso usar um useState 
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])
  // logo, faz sentido usar para a contagem dos votes 

  let change ; // armazenar o número 
  const generateRandomNumber = () => {
    change = () => Math.floor(Math.random() * anecdotes.length)
    setSelected(change)
  }

  const name = useState("Eduardo")
  console.log(name)

const handleVotes = () => {
  const copy = [...votes]
  copy[selected] += 1
  setVotes(copy)
}

// é uma função que chama outra função(no caso setselected)

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <br />
      has {votes[selected]} votes 
      <br />
      <button onClick={handleVotes}>Votesss</button>
      <Button oncClick={handleVotes} text="vote"/>
      <Button onClick={generateRandomNumber} text="next anecdote"/>
    </div>
  )
}

export default App