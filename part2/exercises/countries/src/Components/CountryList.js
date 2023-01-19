const CountryList = ({
	filteredCountries,
	countryToDisplay,
	handleCountryClick,
}) => {
	if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
		return (
			<ul>
				{filteredCountries.map((country) => (
					<li key={country.name.common}>
						{country.name.common}
						<button
							onClick={() =>
								handleCountryClick(country.name.common)
							}
						>
							show
						</button>
					</li>
				))}
			</ul>
		);
	}
	if (filteredCountries.length === 1) {
		let languangesArr = Object.values(countryToDisplay.languages); //tratando o objeto
		return (
			<div>
				<h1>{countryToDisplay.name.common}</h1>
				<p>Capital {countryToDisplay.capital}</p>
				<p>Area {countryToDisplay.area} m²</p>
				<h3>Languages:</h3>
				<ul>
					{languangesArr.map((language) => (
						<li key={countryToDisplay}>{language}</li>
					))}
				</ul>
				<img
					src={countryToDisplay.flags.png}
					alt={`Flag of ${countryToDisplay}`}
				/>
			</div>
		);
	}
	return null
};

export default CountryList;
