import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Components/Filter";

const App = () => {
    
    const [countries, setCountries] = useState([]);//os dados sao armazenados aqui
    const [newFilter, setNewFilter] = useState("");

    //Handle do input do usuário
    const handleChange = (setValue) => (event) => setValue(event.target.value);

    //API é chamada e dados são armazenados no estado
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    //Filtro para países com base na entrada do usuário
    const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
    });

    return (
        <div>
            <Filter value={newFilter} handleChange={handleChange(setNewFilter)} />
            <ul>
                {filteredCountries.map((country) => (
                    <li key={country.name.common}>{country.name.common}</li>
                ))}
            </ul>
        </div>
    );
};
export default App;