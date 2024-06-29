import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { CountryContext } from '../context/CountryContext';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { countries, fetchCountries, addFavorite, favorites } = useContext(CountryContext);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      fetchCountries(searchTerm.trim());
    }
  };

  const handleAddFavorite = (country) => {
    addFavorite(country); // Pass the entire country object to addFavorite
  };

  const isFavorite = (country) => {
    return favorites.some(favorite => favorite.name === country.name);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter currency code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {countries.length > 0 && (
        <div className="results-container">
          <h2>Search Results</h2>
          <div className="card-list">
            {countries.map((country, index) => (
              <div key={index} className="card">
                <h3>{country.name}</h3>
                {country.currencies && country.currencies.length > 0 && (
                  <p><strong>Currency:</strong> {country.currencies[0].code} - {country.currencies[0].name}</p>
                )}
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Languages:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
                {country.flags && (
                  <img src={country.flags.svg} alt={`Flag of ${country.name}`} className="flag-img" />
                )}
                <button onClick={() => handleAddFavorite(country)} >
                  <FaHeart color={isFavorite(country) ? 'red' : 'gray'} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {countries.length === 0 && searchTerm.trim() !== '' && (
        <p>No countries found for "{searchTerm.trim()}".</p>
      )}
    </div>
  );
}

export default Search;
