import { useState } from "react";
import Persons from './Components/Persons'
import Filter from './Components/Filter'




const App = (props) => {
	const [persons, setPersons] = useState(props.persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

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


  const handleChange = setValue => event => setValue(event.target.value)

	return (
		<div>
			<h1>Phonebook</h1>
      <Filter value={newFilter} handleChange={handleChange(setNewFilter)}/>
			<h2>Add a new</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleChange(setNewName)} />
				</div>
				<div>
					number:
					<input value={newNumber} onChange={handleChange(setNewNumber)} />
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.filter(person => person.name.toLowerCase().includes(newFilter)).map((person) => (
					<Persons persons={person} key={person.id} />
				))}
			</ul>
		</div>
	);
};

export default App;
