import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCountries = async (currencyCode) => {
    try {
      const response = await axios.get(`https://restcountries.com/v2/currency/${currencyCode}`);
      setCountries(response.data);
      updateSearchHistory(currencyCode, response.data[0].currencies[0].name); // Update search history with currency name
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const addFavorite = (country) => {
    // Ensure no duplicates in favorites
    if (!favorites.some(favorite => favorite.name === country.name)) {
      const updatedFavorites = [...favorites, country];
      setFavorites(updatedFavorites);
      // Assuming you have an endpoint to save favorites
      axios.post('http://localhost:8080/favorites', country)
        .catch(error => console.error('Error saving favorite:', error));
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:8080/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const updateSearchHistory = (currencyCode, currencyName) => {
    // Avoid duplicates in search history
    if (!history.some(item => item.currencyCode === currencyCode)) {
      const updatedHistory = [...history, { currencyCode, currencyName }];
      setHistory(updatedHistory);
      // Assuming you have an endpoint to save search history
      axios.post('http://localhost:8080/history', { history: updatedHistory })
        .catch(error => console.error('Error saving search history:', error));
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchHistory();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, favorites, history, fetchCountries, addFavorite, fetchFavorites }}>
  {children}
</CountryContext.Provider>

  );
};
