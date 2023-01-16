const CountryList = ({ filteredCountries, countries, newFilter, countryToDisplay}) => {
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
        return (
            <div>
                <h2>{countryToDisplay.name.common}</h2>
            </div>
        )
    }
};

export default CountryList;
