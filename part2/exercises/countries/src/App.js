import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter";
import CountryList from "./Components/CountryList";


//const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt_br&${apiKey}`
//aprender como usar o postman
// https://www.youtube.com/watch?v=rtR4s626ebE




const App = () => {
	const [countries, setCountries] = useState([]); //os dados sao armazenados aqui
	const [newFilter, setNewFilter] = useState("");

	


	const handleCountryClick = (countryName) => {
        setNewFilter(countryName);
    }

	//Handle do input do usuário
	const handleChange = (setValue) => (event) => setValue(event.target.value);

	//API é chamada e dados são armazenados no estado
	useEffect(() => {
		document.title = "Weather App by Dudu"
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	//Filtro para países com base na entrada do usuário
	const filteredCountries = countries.filter((country) => {
		return country.name.common
			.toLowerCase()
			.includes(newFilter.toLowerCase());
	});
    let countryToDisplay = null;
	if (filteredCountries.length === 1) {
		countryToDisplay = filteredCountries[0];
	}

	return (
		<div>
			<Filter
				value={newFilter}
				handleChange={handleChange(setNewFilter)}
			/>
			<CountryList
				filteredCountries={filteredCountries}
				countryToDisplay={countryToDisplay}
				handleCountryClick={handleCountryClick}
			/>
		</div>
	);
};
export default App;
