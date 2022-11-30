import { useState } from "react";

const Button = ({ text, handleClick }) => (
	<button onClick={handleClick}>{text}</button>
);
const Statistics = ({ text, value }) => (
	<p>
		{text}: {value}
	</p>
);

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [all, setAll] = useState(0);


	const setToGood = (incrimental, all) => {
		setGood(incrimental);
		setAll(all);
	};
	const setToNeutral = (incrimental, all) => {
		setNeutral(incrimental);
		setAll(all);
	};
	const setToBad = (incrimental, all) => {
		setBad(incrimental);
		setAll(all);
	};
	const averageUnit = (good - bad) / all || 0;
	const positiveFeedback = (good * 100) / all || 0;

	console.log(
		"good",
		good,
		"neutral",
		neutral,
		"bad",
		bad,
		"average unit",
		averageUnit,
		"positive feedback",
		positiveFeedback
	);
	return (
		<div>
			<h1>Give Feedback</h1>
			<Button
				handleClick={() => setToGood(good + 1, all + 1)}
				text="Good"
			/>
			<Button
				handleClick={() => setToNeutral(neutral + 1, all + 1)}
				text="Neutral"
			/>
			<Button handleClick={() => setToBad(bad + 1, all + 1)} text="Bad" />
			<h2>Statistics</h2>
			<Statistics text="good" value={good} />
			<Statistics text="neutral" value={neutral} />
			<Statistics text="bad" value={bad} />
			<Statistics text="all" value={all} />
			<Statistics text="average" value={averageUnit.toFixed(2)} />
			<Statistics
				text="positive feedback"
				value={positiveFeedback.toFixed(2) + "%"}
			/>
		</div>
	);
};

export default App;
