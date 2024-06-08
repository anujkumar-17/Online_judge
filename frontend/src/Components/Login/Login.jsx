import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/user/login', { email, password });
      const { token, role } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', role === 'admin');
      if(role === 'admin'){
         navigate('/dashboard')
      }
      else{
        navigate('/profile');
      } 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
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
      <p>Don't have an account? <a href="/register">Register</a></p>
      <p>Are you an admin? <a href="/admin/login">Admin Login</a></p>
    </div>
  );
};

export default Login;
