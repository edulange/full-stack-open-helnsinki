import React from "react";

const Filter = ({ newFilter, handleChange }) => {
	return (
		<div className="filter-container">
			<input
				id="country-filter"
				className="filter-input"
				value={newFilter}
				onChange={handleChange}
				placeholder="Search for a country"
			/>
		</div>
	);
};

export default Filter;
