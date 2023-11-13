import React, { useState, useEffect } from "react";
import axios from "axios";
import useCountry from "../hooks/useCountry";

const apiKey = "9230098fd00da4fd9c835976ddf4dbcc";

const CountryList = ({
  filteredCountries,
  countryToDisplay,
  handleCountryClick,
}) => {
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: 0,
    weatherIcon: 0,
    wind: 0,
  });

  const countryDetails = useCountry(
    countryToDisplay ? countryToDisplay.name.common : ""
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (countryDetails) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${countryDetails.capital}&units=metric&APPID=${apiKey}`
          );
          const weatherData = {
            temperature: Math.round(response.data.main.temp),
            wind: response.data.wind.speed,
            weatherIcon: response.data.weather[0].icon,
          };
          setWeatherInfo(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [countryDetails]);

  const renderCountryList = () => {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button
              className="button"
              onClick={() => handleCountryClick(country.name.common)}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderCountryDetails = () => {
    const languagesArr = countryDetails
      ? Object.values(countryDetails.languages)
      : [];

    return (
      <div className="country-card">
        <h1>{countryDetails.name.common}</h1>
        <h2>Capital {countryDetails.capital}</h2>
        <p>Area {countryDetails.area} m²</p>
        <h3>Languages:</h3>
        <ul>
          {languagesArr.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={countryDetails.flags.png}
          alt={`Flag of ${countryDetails.name.common}`}
        />
        <div className="weather-info">
          <h3>Weather in {countryDetails.capital}</h3>
          <p>Temperature {weatherInfo.temperature} ºC</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo.weatherIcon}.png`}
            alt="weather img"
          />
          <p>Wind {weatherInfo.wind} m/s</p>
        </div>
      </div>
    );
  };

  return (
    <div className="country-list-container">
      {filteredCountries.length > 1 &&
      filteredCountries.length <= 10 &&
      !countryDetails
        ? renderCountryList()
        : null}

      {filteredCountries.length === 1 && countryDetails
        ? renderCountryDetails()
        : null}
    </div>
  );
};

export default CountryList;
