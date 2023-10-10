import React from "react"
import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer" // Importe a ação diretamente do slice

const Filter = (props) => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
		const filterValue = event.target.value
		dispatch(setFilter(filterValue)) // Despache a ação do slice
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
