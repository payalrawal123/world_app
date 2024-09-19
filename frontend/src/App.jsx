import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Favorites from './components/Favorites';
import History from './components/History';
import Navbar from './components/Navbar';
import Search from './components/Search';
import CountryDetails from './components/CountryDetails';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Search />}/>
       
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
