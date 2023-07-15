import { useState } from "react";
import axios from "axios";

//const apiKey = '9230098fd00da4fd9c835976ddf4dbcc'
//const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt_br&${apiKey}`
/*
axios.get(weatherAPI).then((response) => {
			setCountries(response.data);
		});

https://api.openweathermap.org/data/2.5/weather?q=berlim&units=metric&lang=pt_br9230098fd00da4fd9c835976ddf4dbcc

*/
const apiKey = '9230098fd00da4fd9c835976ddf4dbcc'



const CountryList = ({
	filteredCountries,
	countryToDisplay,
	handleCountryClick,
}) => {
	const [temperature, setTemperature] = useState(0)
	const [weatherIcon, setWeatherIcon] = useState(0)
	const [wind, setWind] = useState(0)
	

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
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryToDisplay.capital}&units=metric&APPID=${apiKey}`)
		.then(response => {
			setTemperature(Math.round(response.data.main.temp))
			setWind(response.data.wind.speed)
			setWeatherIcon(response.data.weather[0].icon)
		})
		let languangesArr = Object.values(countryToDisplay.languages); //tratando o objeto
		return (
			<div>
				<h1>{countryToDisplay.name.common}</h1>
				<p>Capital {countryToDisplay.capital}</p>
				<p>Area {countryToDisplay.area} m²</p>
				<h3>Languages:</h3>
				<ul>
					{languangesArr.map((language) => (
						<li key={language}>{language}</li>
					))}
				</ul>
				<img
					src={countryToDisplay.flags.png}
					alt={`Flag of ${countryToDisplay}`}
				/>
			<h2>Weather in {countryToDisplay.capital}</h2>
				<p>temperature {temperature} ºC</p>
				<img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt="weather img" />
				<p>wind {wind} m/s</p>
			</div>
		);
	}
	return null
};

export default CountryList;