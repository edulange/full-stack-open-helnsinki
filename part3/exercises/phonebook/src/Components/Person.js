const Person = ({ name, number, id, handleDelete}) => {
	return (
		<>
			{name} {number}
			<button onClick={() => handleDelete(id)}>Delete</button>
		</>
	);
};
export default Person;
