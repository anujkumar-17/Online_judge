import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNormalUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setError('No token found in session storage');
          return;
        }
        // http://localhost:3001/api/user/allusers
        const response = await axios.get('http://3.110.249.20:3001/user/allusers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data) {
          setUsers(response.data);
        } else {
          setError('No users found');
        }
      } catch (error) {
        console.error('Error fetching normal users:', error);
        setError(error.message || 'Error fetching normal users');
      }
    };
    
    fetchNormalUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>Normal Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              Username: {user.username} | Email: {user.email}
            </li>
          ))
        ) : (
          <li>No users available</li>
        )}
      </ul>
    </div>
  );
};

export default Users;
