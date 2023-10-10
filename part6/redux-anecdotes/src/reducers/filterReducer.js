import { createSlice } from '@reduxjs/toolkit';

const initialState = 'FILTERED';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;

/* 
export const filterReducer = (state = "FILTERED", action) => {
	switch (action.type) {
		case "SET_FILTER":
			return action.payload
		default:
			return state
	}
}

export const filterChange = (filter) => {
	return {
		type: "SET_FILTER",
		payload: filter,
	}
}

export default filterReducer
*/