import Person from "./Person";
const Persons = ({ persons, newFilter }) => (
	<>
		{persons
			.filter((person) => person.name.toLowerCase().includes(newFilter))
			.map(({ name, number, id }) => (
				<Person name={name} number={number} key={id} />
			))}
	</>
);

export default Persons;

/*
			.map((person) => (
						<Persons persons={person} key={person.id} />
					))}
*/
