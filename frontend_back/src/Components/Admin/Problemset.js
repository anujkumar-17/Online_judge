import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Problemset = () => {
  const [questions, setQuestions] = useState(["Problem1", "Problem2", "Problem3"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3001/api/questions/getQ");
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
            <h2>{value?.pid}</h2>
            <h2>{value?.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problemset;
