const Person = ({ name, number, id }) => {
	return (
		<li key={id}>
			{name} {number}
		</li>
	);
};
export default Person;
