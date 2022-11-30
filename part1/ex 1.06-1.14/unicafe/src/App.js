import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = all > 0 ? ((good - bad) / all).toFixed(2) : 0;
	const positive = all > 0 ? ((good * 100) / all).toFixed(2) : 0;
	return (
		<>
			<h2>Statistics</h2>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {average}</p>
			<p>positive {positive}</p>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const increment = (state, setState) => () => setState(state + 1);

	console.log("good", good, "neutral", neutral, "bad", bad);
	return (
		<div>
			<h1>Give Feedback</h1>
			<Button onClick={increment(good, setGood)} text="good" />
			<Button onClick={increment(neutral, setNeutral)} text="neutral" />
			<Button onClick={increment(bad, setBad)} text="bad" />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
