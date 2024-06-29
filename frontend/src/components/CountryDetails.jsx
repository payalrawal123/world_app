import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryDetails = ({ countryCode }) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/countries/${countryCode}`);
        setCountry(response.data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryDetails();
    }
  }, [countryCode]);

  if (loading) {
    return <p>Loading country details...</p>;
  }

  if (!country) {
    return <p>No country details found.</p>;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Currency: {country.currency}</p>
      <p>Capital: {country.capital}</p>
      <p>Languages: {country.languages.join(', ')}</p>
      <img src={`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`} alt={`Flag of ${country.name}`} />
    </div>
  );
}

export default CountryDetails;
