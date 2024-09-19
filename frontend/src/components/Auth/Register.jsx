import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(credentials);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', width: '300px', margin: '2rem auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Register</h2>
      <input
        type="text"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Enter Username"
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        placeholder="Enter Username"
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Enter Password"
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
      <button type="submit" style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer', width: '100%' }}>
        Register
      </button>
    </form>
  );
}

export default Register;
