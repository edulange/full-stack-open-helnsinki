const Filter = ({ newFilter, handleChange }) => {
	return (
		<p>
			Find countries {" "}
			<input value={newFilter} onChange={handleChange} />
		</p>
	);
};
export default Filter;
