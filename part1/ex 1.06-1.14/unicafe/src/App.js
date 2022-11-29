import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({text, value}) => <p>{text}: {value}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
   

  const setToGood = incrimental => {
    console.log('value now', incrimental)
    setGood(incrimental)
  }
  const setToNeutral = incrimental => {
    console.log('value now', incrimental)
    setNeutral(incrimental)
  }
  const setToBad = incrimental => {
    console.log('value now', incrimental)
    setBad(incrimental)
  }
    
console.log(good, neutral, bad)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="Good"/>
      <Button handleClick={() => setToNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setToBad(bad + 1)} text="Bad"/>
      <h2>Statistics</h2>
      <Display text="good"value={good}/>
      <Display text="neutral"value={neutral}/>
      <Display text="bad"value={bad}/>
    </div>
  )
}

export default App