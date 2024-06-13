import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [questions, setQuestions] = useState();
  const navigate=useNavigate();
  const getQ=async()=>{
    const response=await axios.get("http://localhost:3001/api/questions/getQ")
    //console.log(response);
    setQuestions(response?.data?.data)
  }
  useEffect(()=>{
    getQ();
},[])
  

return (
  <div>
     <div className='QuestionTitle' >
          <h2>Questions</h2>
     </div>
    <div className='QuestionBlock' >
      {
        questions && questions.map((value,idx)=>(
          <div className='QuestionsQuestionDiv'  key={idx}>
            <h4 className='QuestionsQuestion'  
            onClick={()=>{setQuestions(value?.title);
            navigate("/compiler")}
            }>{value?.title}</h4>
          </div>
        ))
      }
    </div>
  </div>
)
};

export default Profile;
