
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Box, Button, Typography, styled } from '@mui/material';
// import Navigation from '../../Navigation';
// import './Problems.css';

// const Background = styled('div')({
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   background: '#f0f0f0',
//   color: '#333',
// });

// const Card = styled(Box)({
//   background: '#fff',
//   padding: '2rem',
//   borderRadius: '8px',
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   textAlign: 'center',
//   color: '#333',
//   width: '100%',
//   maxWidth: '1200px',
//   margin: '0 auto',
// });

// const Header = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   marginBottom: '20px',
//   alignItems: 'center',
// });

// const Title = styled(Typography)({
//   fontSize: '3rem',
//   marginBottom: '10px',
//   fontWeight: 'bold',
// });

// const Problems = () => {
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [difficultyFilter, setDifficultyFilter] = useState('All');
//   const [sortBy, setSortBy] = useState('number');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = sessionStorage.getItem('token');
//         if (!token) {
//           navigate('/');
//           return;
//         }

//         const response = await axios.get("http://localhost:3001/api/questions/getquestions", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = response.data.data;
//         setQuestions(data);
//         setFilteredQuestions(data);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchData();
//   }, [navigate]);

//   useEffect(() => {
//     let result = [...questions];
//     if (difficultyFilter !== 'All') {
//       result = result.filter(q => q.difficulty && q.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
//     }
//     if (sortBy === 'difficulty') {
//       const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Unknown': 4 };
//       result.sort((a, b) => (difficultyOrder[a.difficulty || 'Unknown'] || 4) - (difficultyOrder[b.difficulty || 'Unknown'] || 4));
//     } else {
//       result.sort((a, b) => a.pid - b.pid);
//     }
//     setFilteredQuestions(result);
//   }, [questions, difficultyFilter, sortBy]);

//   const handleFilterChange = (difficulty) => {
//     setDifficultyFilter(difficulty);
//   };

//   const handleSortChange = (sort) => {
//     setSortBy(sort);
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch(difficulty?.toLowerCase()) {
//       case 'easy': return '#4caf50';  // Green
//       case 'medium': return '#ffc107';  // Yellow
//       case 'hard': return '#f44336';  // Red
//       default: return '#9e9e9e';  // Grey for Unknown
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <Background>
//         <Card>
//           <Header>
//           <Title variant="h2">Coding Problems</Title>
//           </Header>
//           <Box mt={4} display="flex" justifyContent="space-between" className="filter-sort">
//             <div className="filter-buttons">
//               <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('All')}>ALL</Button>
//               <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('Easy')}>EASY</Button>
//               <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('Medium')}>MEDIUM</Button>
//               <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('Hard')}>HARD</Button>
//             </div>
//             <div className="sort-buttons">
//               <Button variant="contained" color="primary" size="small" onClick={() => handleSortChange('number')}>SORT BY NUMBER</Button>
//               <Button variant="contained" color="primary" size="small" onClick={() => handleSortChange('difficulty')}>SORT BY DIFFICULTY</Button>
//             </div>
//           </Box>
//           <ul className="problem-list">
//             {filteredQuestions.map((question, idx) => (
//               <li key={idx} className="problem-item">
//                 <div className="problem-left">
//                   <div className="problem-number">{question.pid}</div>
//                   <div className="problem-info">
//                     <h3 className="problem-name">{question.pName}</h3>
//                     <div className="problem-tags">
//                       <span 
//                         className="tag difficulty"
//                         style={{backgroundColor: getDifficultyColor(question.difficulty)}}
//                       >
//                         {question.difficulty || 'Unknown'}
//                       </span>
//                       {question.tags && question.tags.map((tag, tagIdx) => (
//                         <span key={tagIdx} className="tag">{tag}</span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <Link to={`/compiler/${question.pid}`} className="view-problem-btn">
//                   View Problem →
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </Card>
//       </Background>
//     </>
//   );
// };

// export default Problems;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, styled } from '@mui/material';
import Navigation from '../../Navigation';
import DeleteProblem from '../Admin/DeleteProblem'; // Import DeleteProblem component
import './Problems.css';

const Background = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f0f0f0',
  color: '#333',
});

const Card = styled(Box)({
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  color: '#333',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  alignItems: 'center',
});

const Title = styled(Typography)({
  fontSize: '3rem',
  marginBottom: '10px',
  fontWeight: 'bold',
});

const Problems = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('number');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        // http://localhost:3001/api/questions/getquestions
        const response = await axios.get("http://3.110.249.20:3001/api/questions/getquestions", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data.data;
        setQuestions(data);
        setFilteredQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    let result = [...questions];
    if (difficultyFilter !== 'All') {
      result = result.filter(q => q.difficulty && q.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
    }
    if (sortBy === 'difficulty') {
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Unknown': 4 };
      result.sort((a, b) => (difficultyOrder[a.difficulty || 'Unknown'] || 4) - (difficultyOrder[b.difficulty || 'Unknown'] || 4));
    } else {
      result.sort((a, b) => a.pid - b.pid);
    }
    setFilteredQuestions(result);
  }, [questions, difficultyFilter, sortBy]);

  const handleFilterChange = (difficulty) => {
    setDifficultyFilter(difficulty);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '#4caf50';  // Green
      case 'medium': return '#ffc107';  // Yellow
      case 'hard': return '#f44336';  // Red
      default: return '#9e9e9e';  // Grey for Unknown
    }
  };

  const handleDelete = (deletedPName) => {
    // Remove the deleted problem from state
    setQuestions(prevQuestions => prevQuestions.filter(q => q.pName !== deletedPName));
    setFilteredQuestions(prevFiltered => prevFiltered.filter(q => q.pName !== deletedPName));
  };

  // Check if the user is admin
  const isAdmin = sessionStorage.getItem('userRole') === 'admin';

  return (
    <>
      <Navigation />
      <Background>
        <Card>
          <Header>
            <Title variant="h2">Coding Problems</Title>
          </Header>
          <Box mt={4} display="flex" justifyContent="space-between" className="filter-sort">
            <div className="filter-buttons">
              <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('All')}>ALL</Button>
              <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('Easy')}>EASY</Button>
              <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('Medium')}>MEDIUM</Button>
              <Button variant="contained" color="primary" size="small" onClick={() => handleFilterChange('Hard')}>HARD</Button>
            </div>
            <div className="sort-buttons">
              <Button variant="contained" color="primary" size="small" onClick={() => handleSortChange('number')}>SORT BY NUMBER</Button>
              <Button variant="contained" color="primary" size="small" onClick={() => handleSortChange('difficulty')}>SORT BY DIFFICULTY</Button>
            </div>
          </Box>
          <ul className="problem-list">
            {filteredQuestions.map((question, idx) => (
              <li key={idx} className="problem-item">
                <div className="problem-left">
                  <div className="problem-number">{question.pid}</div>
                  <div className="problem-info">
                    <h3 className="problem-name">{question.pName}</h3>
                    <div className="problem-tags">
                      <span 
                        className="tag difficulty"
                        style={{backgroundColor: getDifficultyColor(question.difficulty)}}
                      >
                        {question.difficulty || 'Unknown'}
                      </span>
                      {question.tags && question.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {isAdmin && <DeleteProblem problem={question} onDelete={handleDelete} />}
                <Link to={`/compiler/${question.pid}`} className="view-problem-btn">
                  View Problem →
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </Background>
    </>
  );
};

export default Problems;
