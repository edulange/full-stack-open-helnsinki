import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [newFilter, setNewFilter] = useState("");


	const handleChange = (setValue) => (event) => setValue(event.target.value);

	// eu não preciso de um "npx json-server --port 3001 --watch db.json"
	//pq? => pq eu chamo o API direto do site
	useEffect(() => {
		console.log("effect");
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			console.log("promise cumprida xD");
			console.log("response.data", response.data);
			setCountries(response.data);
		});
	}, []);

//vamos fazer o filtrinho xD


	return (
		<div>
			<Filter
				value={newFilter}
				handleChange={handleChange(setNewFilter)}
			/>
    <ul>
    {countries.map((country) => (
        <li key={1}>{country.name.common}</li>
    ))}
</ul>
		</div>
	);
};
export default App;
