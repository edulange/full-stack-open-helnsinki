const CountryList = ({ filteredCountries }) => {
    if (filteredCountries.length <= 10) {
        return (
             (
                <ul>
                    {filteredCountries.map((country) => (
                        <li key={country.name.common}>{country.name.common}</li>
                    ))}
                </ul>
            )
        );
    }
};

export default CountryList;
