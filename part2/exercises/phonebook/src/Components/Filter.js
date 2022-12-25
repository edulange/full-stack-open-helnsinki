const Filter = ({ newFilter, handleChange }) => {
	return (
		<p>
			filter shown with{" "}
			<input value={newFilter} onChange={handleChange} />
		</p>
	);
};
export default Filter;
