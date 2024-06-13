import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/admin/login', { email, password });
      const { token, role } = data;
      if (role !== 'admin') {
        alert('You are not an admin!');
        return;
      }
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', true);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>Not an admin? <a href="/">User Login</a></p>
    </div>
  );
};

export default AdminLogin;
