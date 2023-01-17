const CountryList = ({ filteredCountries, countryToDisplay}) => {
    if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
             (
                <ul>
                    {filteredCountries.map((country) => (
                        <li key={country.name.common}>{country.name.common}</li>
                    ))}
                </ul>
            )
        );
    } if (filteredCountries.length === 1) {
        console.log(Object.values(countryToDisplay.languages))
        return (
            <div>
                <h1>{countryToDisplay.name.common}</h1>
                <p>{countryToDisplay.capital}</p>
                <p>{countryToDisplay.area}</p>
                    <p>{Object.values(countryToDisplay.languages)}</p>

                
            </div>
        )
    }
};

export default CountryList;
