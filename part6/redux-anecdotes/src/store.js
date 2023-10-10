import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './reducers/anecdoteReducer'; // Importe o reducer de suas anedotas
import filterReducer from './reducers/filterReducer'; // Importe o reducer do filtro

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
  },
});

export default store;
