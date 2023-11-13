import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (countryName) => {
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    if (countryName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          const countryData = response.data[0];
          setCountryDetails(countryData);
        })
        .catch((error) => {
          console.error("Error fetching country data:", error);
          setCountryDetails(null);
        });
    } else {
      setCountryDetails(null);
    }
  }, [countryName]);

  return countryDetails;
};

export default useCountry;
