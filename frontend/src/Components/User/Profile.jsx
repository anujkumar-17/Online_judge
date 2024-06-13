import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css'; // Import your custom styles

const Profile = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const data = await axios.get("http://localhost:3001/api/questions/getquestions", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(data?.data?.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    // Navigate to the login page
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="header">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <div className="problemset-section">
        <h2>Problemset</h2>
        <ul className="problem-list">
          {questions && questions.map((value, idx) => (
            <li key={idx} className="problem-item">
              <Link to={`/compiler/${value.pid}`} className="problem-link">
                {value?.pName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;