import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Correct import statement
import axios from 'axios';  // Ensure axios is installed

const HomePage = ({ Problem }) => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  const getQ = async () => {
    try {
      // http://localhost:3001/api/questions/getquestions
      const response = await axios.get("http://3.110.249.20:3001/api/questions/getquestions");
      setProblems(response?.data?.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getQ();
  }, []);

  return (
    <div>
       <div>
            <h2>Questions</h2>
       </div>
      <div>
        {
          problems && problems.map((value, idx) => (
            <div key={idx}>
              <h4 style={{ cursor: "pointer" }} onClick={() => { Problem(value?.title); navigate("/compiler"); }}>{value?.title}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/user/home');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>User Home Page</h2>
     
    </div>
  );
};

export default HomePage;
*/
