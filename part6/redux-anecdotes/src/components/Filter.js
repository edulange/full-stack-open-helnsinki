import React from "react"
import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = (props) => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
		const filterValue = event.target.value
		dispatch(filterChange(filterValue)) // Despache a ação, não o reducer
	}

	const style = {
		marginBottom: 10,
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	)
}

export default Filter
