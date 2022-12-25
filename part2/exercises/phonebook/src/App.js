import { useState } from "react";

const Numbers = ({ persons }) => {
	return <li>{persons.name}</li>;
};

const App = (props) => {
	const [persons, setPersons] = useState(props.persons);
	const [newName, setNewName] = useState("");

	const addName = (event) => {
		//o addname só vai ser executado ao ser submitado
		const checkName = persons.some((person) => newName === person.name);
		if (!checkName) {
			event.preventDefault();
			const nameObject = {
				name: newName,
				id: persons.length + 1,
			};
			setPersons(persons.concat(nameObject));
			setNewName("");
		} else {
      event.preventDefault();
      alert(`${newName} is already added to phonebook`)
			setNewName("");
    }
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
		//sinceramente to meio boiando com essa parada
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
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
