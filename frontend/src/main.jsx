import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CountryProvider } from './context/CountryContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <CountryProvider>
        <App />
      </CountryProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
