import React, { useContext, useEffect } from 'react';
import { CountryContext } from '../context/CountryContext';

const SearchHistory = () => {
  const { history, fetchCountries } = useContext(CountryContext);

  useEffect(() => {
    console.log('History:', history); // Log history to inspect its contents
  }, [history]);

  const handleClickSearch = (currencyCode) => {
    fetchCountries(currencyCode);
  };

  return (
    <div>
      <h2>Search History</h2>
      {history.length === 0 ? (
        <p>No recent searches.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <button onClick={() => handleClickSearch(item.currencyCode)}>
                {item.currencyCode}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;
