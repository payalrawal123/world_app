import React, { useContext, useEffect } from 'react';
import { CountryContext } from '../context/CountryContext';
import './Favorite.css'; // Import your CSS file for styling

const Favorites = () => {
  const { favorites, fetchFavorites } = useContext(CountryContext);

  useEffect(() => {
    fetchFavorites(); // Call fetchFavorites function from context
  }, []); // Empty dependency array to fetch only once on mount

  return (
    <div className="favorites-container">
      <h2>Favorite Countries</h2>
      <div className="favorites-list">
        {favorites.map((country, index) => (
          <div key={index} className="favorite-card">
            <h3>{country.name}</h3>
            {country.currencies && country.currencies.length > 0 && (
              <p><strong>Currency:</strong> {country.currencies[0].code} - {country.currencies[0].name}</p>
            )}
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Languages:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
            {country.flags && (
              <img src={country.flags.svg} alt={`Flag of ${country.name}`} className="flag-img" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
