const Person = ({ name, number }) => {
	const deleteRequest = () => {
		var result = window.confirm("Press a button!");
		if (result == true) {
			console.log("OK was pressed.")
		} else {
			console.log("Cancel was pressed.")
		}
	}
	return (
		<li>
			{name} {number}
			<button onClick={deleteRequest} >Delete</button>
		</li>
	);
};
export default Person;
