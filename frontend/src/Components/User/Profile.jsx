import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/questions/getquestions');
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuestionClick = (title) => {
    navigate('/compiler', { state: { problemTitle: title } });
  };

  return (
    <div>
      <div className='QuestionTitle'>
        <h2>Problems</h2>
      </div>
      <div className='QuestionBlock'>
        {questions.map((question, idx) => (
          <div className='QuestionsQuestionDiv' key={idx}>
            <h4
              className='QuestionsQuestion'
              onClick={() => handleQuestionClick(question.pName)}
            >
              {question.pName}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Profile = () => {
//   const [questions, setQuestions] = useState();
//   const navigate=useNavigate();
//   const getQ=async()=>{
//     const response=await axios.get("http://localhost:3001/api/questions/getQ")
//     //console.log(response);
//     setQuestions(response?.data?.data)
//   }
//   useEffect(()=>{
//     getQ();
// },[])
  

// return (
//   <div>
//      <div className='QuestionTitle' >
//           <h2>Problems</h2>
//      </div>
//     <div className='QuestionBlock' >
//       {
//         questions && questions.map((value,idx)=>(
//           <div className='QuestionsQuestionDiv'  key={idx}>
//             <h4 className='QuestionsQuestion'  
//             onClick={()=>{setQuestions(value?.title);
//             navigate("/compiler")}
//             }>{value?.title}</h4>
//           </div>
//         ))
//       }
//     </div>
//   </div>
// )
// };

// export default Profile;
