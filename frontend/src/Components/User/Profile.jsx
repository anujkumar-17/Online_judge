import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
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

export default Profile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const { data } = await axios.get('http://localhost:3001/api/user/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {user && (
//         <div>
//           <p>Username: {user.username}</p>
//           <p>Email: {user.email}</p>
//           <p>Birth Year: {user.birthYear}</p>
//           <p>Country: {user.country}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Profile = () => {
//   const [problems, setProblems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/questions/getquestions');
//         setProblems(response.data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const handleProblemClick = (pid) => {
//     navigate(`/compiler/${pid}`);
//   };

//   return (
//     <div>
//       <h2>List of Problems</h2>
//       <ul>
//         {problems.map((problem) => (
//           <li key={problem.pid} onClick={() => handleProblemClick(problem.pid)}>
//             {problem.pName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Profile = () => {
//   const [problems, setProblems] = useState([]);
//   const navigate = useNavigate();

//   const fetchProblems = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/api/questions/getquestions', {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       setProblems(response?.data);
//     } catch (error) {
//       console.error('Error fetching problems:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const handleProblemClick = (pid) => {
//     navigate(`/compiler/${pid}`);
//   };

//   return (
//     <div className='HomePage'>
//       <div className='QuestionTitle'>
//         <h2>List of Problems</h2>
//       </div>
//       <div className='QuestionBlock'>
//         {problems && problems.map((problem, idx) => (
//           <div className='QuestionsQuestionDiv' key={idx}>
//             <h4>{idx + 1}</h4>
//             <h4 className='QuestionsQuestion' onClick={() => handleProblemClick(problem.pid)}>
//               {problem.pName}
//             </h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Profile;
