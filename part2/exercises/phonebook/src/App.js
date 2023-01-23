import { useState, useEffect } from "react";

import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import numbersService from "./services/phonenumbers";

const App = (props) => {
	const [persons, setPersons] = useState(props.persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		numbersService.getAll().then((initialPhoneNumbers) => {
			setPersons(initialPhoneNumbers);
		});
	}, []);

	const addName = (event) => {
		//o addname só vai ser executado ao ser submitado
		const checkName = persons.some(
			(person) => newName === person.name.toLowerCase()
		);
		if (!checkName) {
			event.preventDefault();
			const nameObject = {
				name: newName,
				number: newNumber,
				id: newNumber,
			};
			numbersService.create(nameObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
			});
			numbersService
				.update(nameObject.id, nameObject)
				.then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
					setNewName("");
					setNewNumber("");
				});
		} else {
			event.preventDefault();
			alert(`${newName} is already added to phonebook`);
			setNewName("");
		}
	};

	const handleChange = (setValue) => (event) => setValue(event.target.value);

	const handleDelete = (id) => {
		let result = window.confirm("Do you want do delete?")
		if (result == true) {
			numbersService.remove(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});

		}
	};
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
			<h2>Numbers List</h2>
			<ul>
				<Persons
					persons={persons}
					newFilter={newFilter}
					handleDelete={handleDelete}
				/>
			</ul>
		</div>
	);
};

export default App;
