const CountryList = ({ filteredCountries, countries}) => {
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
        return console.log(countries)
    }
};

export default CountryList;
