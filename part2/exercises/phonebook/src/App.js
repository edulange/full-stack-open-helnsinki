import { useState } from "react";

const Numbers = ({ persons }) => {
	return (
		<li>
			{persons.name} {persons.number}
		</li>
	);
};

const App = (props) => {
	const [persons, setPersons] = useState(props.persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const addName = (event) => {
		//o addname só vai ser executado ao ser submitado
		const checkName = persons.some((person) => newName === person.name);
		if (!checkName) {
			event.preventDefault();
			const nameObject = {
				name: newName,
				id: persons.length + 1,
				number: newNumber,
			};
			setPersons(persons.concat(nameObject));
			setNewName("");
			setNewNumber("");
		} else {
			event.preventDefault();
			alert(`${newName} is already added to phonebook`);
			setNewName("");
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
		//agora eu entendi, eu preicso fazer isso para ele renderizar a colocação de CADA letra
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:
					<input value={newNumber} onChange={handleNumberChange} />
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<Numbers persons={person} key={person.id} />
				))}
			</ul>
		</div>
	);
};

export default App;
