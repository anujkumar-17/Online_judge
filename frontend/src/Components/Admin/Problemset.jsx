import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Problemset = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3001/api/questions/getquestions");
        setQuestions(data?.data?.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {questions && questions.map((value, idx) => (
          <div key={idx}>
            <Link to={`/compiler/${value.pid}`}>
              <h2>{value?.pName}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problemset;
