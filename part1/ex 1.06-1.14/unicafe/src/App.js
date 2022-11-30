import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value}) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = all > 0 ? ((good - bad) / all).toFixed(2) : 0;
	const positive = good > 0 ? ((good * 100) / all).toFixed(2) +"%" : 0;

	return (
		all > 0 ? (
		<>
			<h2>Statistics</h2>
			<StatisticLine text="good" value={good}/>
			<StatisticLine text="neutral" value={neutral}/>
			<StatisticLine text="bad" value={bad}/>
			<StatisticLine text="all" value={all}/>
			<StatisticLine text="average" value={average}/>
			<StatisticLine text="positive" value={positive}/>
		</>
		) : <p>No feedbacks given yet</p>
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
