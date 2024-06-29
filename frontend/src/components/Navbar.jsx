import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Search</Link>
      <div className="auth-links">
          <>
            <Link to="/favorites">Favorites</Link>
            <Link to="/history">History</Link>
          </>
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
    
      </div>
    </nav>
  );
}

export default Navbar;
