
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('isAdmin'); // Remove isAdmin from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
