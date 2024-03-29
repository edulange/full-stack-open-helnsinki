import { useState, useEffect } from "react";

import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import numbersService from "./services/phonenumbers";
import Notification from "./Components/Notification";
import ErrorNotification from "./Components/ErrorNotification";

const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 16,
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>Eduardo Lange estudando 😊</em>
		</div>
	);
};

const App = (props) => {
	const [persons, setPersons] = useState(props.persons);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [successfulMessage, setSuccessfulMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

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
		const nameObject = {
			name: newName,
			number: newNumber,
			id: newNumber,
		};

		if (!checkName) {
			event.preventDefault();
			numbersService.create(nameObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName("");
				setNewNumber("");
				setSuccessfulMessage(`${nameObject.name} foi adicionado`);
				setTimeout(() => {
					setSuccessfulMessage(null);
				}, 5000);
			});

			numbersService
				.update(nameObject.id, nameObject)
				.then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
					setNewName("");
					setNewNumber("");
				});
		}
		if (checkName) {
			event.preventDefault();
			let result = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			if (result === true) {
				const existingPerson = persons.find(
					(person) => person.name === newName
				);
				const updatedPerson = { ...existingPerson, number: newNumber };
				numbersService
					.update(existingPerson.id, updatedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id === existingPerson.id
									? returnedPerson
									: person
							)
						);
						setNewName("");
						setNewNumber("");
						setSuccessfulMessage(`o número de ${nameObject.name} foi alterado`);
						setTimeout(() => {
							setSuccessfulMessage(null);
						}, 5000);
					})
					.catch(error => {
						console.log('error :>> ', error);
						setErrorMessage(
							`${nameObject.name} has already been removed from the server`
							)
						setTimeout(() => {
							setErrorMessage(null)
						}, 5000);
					})
			}
		}
	};

	const handleChange = (setValue) => (event) => setValue(event.target.value);

	const handleDelete = (id) => {
		let result = window.confirm("Do you want do delete?");
		if (result === true) {
			numbersService.remove(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};
	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={successfulMessage} />
			<ErrorNotification message={errorMessage} />
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
			<Footer />
		</div>
	);
};

export default App;
