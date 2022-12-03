import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ anecdotes, votes }) => {
	return (
		<>
			{anecdotes}
			<br />
			has {votes} votes
			<br />
		</>
	);
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

	const [selected, setSelected] = useState(0);
	//tudo que precis ficar re-renderizando, eu preciso usar um useState
	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
	// logo, faz sentido usar para a contagem dos votes

	let change; // armazenar o número
	const generateRandomNumber = () => {
		change = () => Math.floor(Math.random() * anecdotes.length);
		setSelected(change);
	};

	const handleVotes = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
	};

	//Math.max (acha o maior num do array)
	const biggestNum = Math.max(...votes);
	const most = votes.indexOf(biggestNum);
	return (
		<div>
			<h2>Anecdote of the day</h2>
			<Anecdote anecdotes={anecdotes[selected]} votes={votes[selected]} />

			<button onClick={handleVotes}>Votesss</button>
			<Button onClick={generateRandomNumber} text="next anecdote" />
			<h2>Anecdote with most votes</h2>

			<Anecdote anecdotes={anecdotes[most]} votes={votes[most]} />
		</div>
	);
};

export default App;
