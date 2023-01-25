const Persons = ({ persons, newFilter, handleDelete }) => (
	<ul>
		{persons
			.filter((person) => person.name.toLowerCase().includes(newFilter))
			.map(({ name, number, id }) => (
				<li className="contact"
					name={name} number={number} key={id}>
					{" "}
					{name} {number}
					<button onClick={() => handleDelete(id)}>Delete</button>
				</li>
			))}
	</ul>
);

export default Persons;
