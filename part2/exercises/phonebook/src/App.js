import { useState } from "react";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";

const App = (props) => {
	const [persons, setPersons] = useState(props.persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	const addName = (event) => {
		//o addname só vai ser executado ao ser submitado
		const checkName = persons.some(
			(person) => newName === person.name.toLowerCase()
		);
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

	const handleChange = (setValue) => (event) => setValue(event.target.value);

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter
				value={newFilter}
				handleChange={handleChange(setNewFilter)}
			/>
			<h2>Add a new</h2>
			<PersonForm
				name={newName}
				number={newNumber}
				handleChangeName={handleChange(setNewName)}
				handleChangeNumber={handleChange(setNewNumber)}
				handleAddPerson={addName}
			/>
			<h2>Numbers</h2>
			<ul>
				<Persons persons={persons} newFilter={newFilter} />
			</ul>
		</div>
	);
};

export default App;
