// import React, { useState, useEffect } from 'react';
// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism-tomorrow.css';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './Compiler.css';
// import DeleteProblem from './Components/Admin/DeleteProblem';

// const Compiler = () => {
//   const [code, setCode] = useState(`
//     #include <bits/stdc++.h>
//     using namespace std;

//     int main() {
      
//       // you can start writing your code from here

//       return 0;
//     }
//   `);
//   const [output, setOutput] = useState('');
//   const [language, setLanguage] = useState('cpp');
//   const [input, setInput] = useState('');
//   const [problemStatement, setProblemStatement] = useState('');
//   const [evaluationResult, setEvaluationResult] = useState('');
//   const [showDelete, setShowDelete] = useState(false);

//   const userRole = useSelector((state) => state.user.role);

//   const { pid } = useParams();

//   useEffect(() => {
//     const fetchProblemStatement = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/questions/getquestions/${pid}`);
//         setProblemStatement(response.data.problemStatement);
//       } catch (error) {
//         console.error('Error fetching problem statement:', error);
//       }
//     };

//     fetchProblemStatement();

//     // Check user role and set showDelete state accordingly
//     if (userRole === 'admin') {
//       setShowDelete(true);
//     }
//   }, [pid, userRole]);

//   const runTheCode = async () => {
//     const payload = {
//       language,
//       code,
//       input,
//     };

//     try {
//       const { data } = await axios.post('http://localhost:3001/api/run', payload);
//       setOutput(data.output);
//     } catch (error) {
//       console.log(error.response);
//     }
//   };

//   const evaluateCode = async () => {
//     const payload = {
//       language,
//       code,
//       pid,
//     };

//     try {
//       const { data } = await axios.post('http://localhost:3001/api/evaluate', payload);
//       setEvaluationResult(data.isAccepted ? 'Accepted' : 'Not Accepted');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const selectedLang = (event) => {
//     setLanguage(event.target.value);
//   };

//   const updateCode = (value) => {
//     setCode(value);
//   };

//   const updateInput = (value) => {
//     setInput(value);
//   };

//   return (
//     <div className="compiler-container">
//       <div className="problem-statement-container">
//         <div className="problem-statement">{problemStatement}</div>
//         <div className="custom-input-section">
//           <h3>Custom Input</h3>
//           <textarea
//             placeholder="Enter custom input"
//             value={input}
//             onChange={(e) => updateInput(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="output-section">
//           <h3>Output</h3>
//           <div className="output-box">{output}</div>
//         </div>
//       </div>
//       <div className="code-editor-container">
//         <div className="language-selection">
//           <select name="language" value={language} onChange={selectedLang}>
//             <option value="cpp">C++</option>
//             <option value="c">C</option>
//             <option value="py">Python</option>
//             <option value="java">Java</option>
//           </select>
//         </div>
//         <div className="code-editor">
//           <Editor
//             value={code}
//             onValueChange={(code) => updateCode(code)}
//             highlight={(code) => highlight(code, languages.js)}
//             padding={10}
//             style={{
//               fontFamily: '"Fira code", "Fira Mono", monospace',
//               fontSize: 14,
//               backgroundColor: '#2d2d2d',
//               color: '#f8f8f2',
//               minHeight: '500px',
//               borderRadius: '5px',
//               border: '1px solid #ddd',
//               overflowY: 'auto',
//             }}
//           />
//           <div className="button-container">
//             <button className="run-button" onClick={runTheCode}>
//               Run
//             </button>
//             <button className="submit-button" onClick={evaluateCode}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`evaluation-result ${
//           evaluationResult === 'Accepted' ? 'accepted' : 'not-accepted'
//         }`}
//       >
//         {evaluationResult}
//       </div>
//       {userRole === 'admin' && (
//         <div className="admin-controls">
//           {showDelete ? (
//             <>
//               <button
//                 className="delete-toggle-button"
//                 onClick={() => setShowDelete(false)}
//               >
//                 Hide Delete Problem
//               </button>
//               <DeleteProblem />
//             </>
//           ) : (
//             <button
//               className="delete-toggle-button"
//               onClick={() => setShowDelete(true)}
//             >
//               Delete Problem
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Compiler;


import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './Navigation'; // Adjust import path as per your project structure
import './Compiler.css';
import DeleteProblem from './Components/Admin/DeleteProblem';

const Compiler = () => {
  const [code, setCode] = useState(`
    #include <bits/stdc++.h>
    using namespace std;

    int main() {
      
      // you can start writing your code from here

      return 0;
    }
  `);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [problemDetails, setProblemDetails] = useState({});
  const [evaluationResult, setEvaluationResult] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const userRole = useSelector((state) => state.user.role);

  const { pid } = useParams();

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        // http://localhost:3001/api/questions/getquestions/${pid}
        const response = await axios.get(`http://3.110.249.20:3001/api/questions/getquestions/${pid}`);
        setProblemDetails(response.data);
      } catch (error) {
        console.error('Error fetching problem details:', error);
      }
    };

    fetchProblemDetails();

    if (userRole === 'admin') {
      setShowDelete(true);
    }
  }, [pid, userRole]);

  const runTheCode = async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      // http://localhost:3001/api/run
      const { data } = await axios.post('http://3.110.249.20:3001/api/run', payload);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const evaluateCode = async () => {
    const payload = {
      language,
      code,
      pid,
    };

    try {
      // http://localhost:3001/api/evaluate
      const { data } = await axios.post('http://3.110.249.20:3001/api/evaluate', payload);
      setEvaluationResult(data.isAccepted ? 'Accepted' : 'Not Accepted');
    } catch (error) {
      console.log(error);
    }
  };

  const selectedLang = (event) => {
    setLanguage(event.target.value);
  };

  const updateCode = (value) => {
    setCode(value);
  };

  const updateInput = (value) => {
    setInput(value);
  };

  return (
    <>
      <Navigation />
      <div className="compiler-container">
        <div className="problem-statement-container">
          <h3>Problem Statement</h3>
          <div className="problem-statement">{problemDetails.statement}</div>
          <div className="custom-input-section">
            <h3>Custom Input</h3>
            <textarea
              placeholder="Enter custom input"
              value={input}
              onChange={(e) => updateInput(e.target.value)}
            ></textarea>
          </div>
          <div className="output-section">
            <h3>Output</h3>
            <div className="output-box">{output}</div>
          </div>
        </div>
        <div className="code-editor-container">
          <div className="language-selection">
            <select name="language" value={language} onChange={selectedLang}>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="py">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="code-editor">
            <Editor
              value={code}
              onValueChange={(code) => updateCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: '#2d2d2d',
                color: '#f8f8f2',
                minHeight: '500px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                overflowY: 'auto',
              }}
            />
            <div className="button-container">
              <button className="run-button" onClick={runTheCode}>
                Run
              </button>
              <button className="submit-button" onClick={evaluateCode}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div
          className={`evaluation-result ${
            evaluationResult === 'Accepted' ? 'accepted' : 'not-accepted'
          }`}
        >
          {evaluationResult}
        </div>
        {userRole === 'admin' && (
          <div className="admin-controls">
            {showDelete ? (
              <>
                <button
                  className="delete-toggle-button"
                  onClick={() => setShowDelete(false)}
                >
                  Hide Delete Problem
                </button>
                <DeleteProblem />
              </>
            ) : (
              <button
                className="delete-toggle-button"
                onClick={() => setShowDelete(true)}
              >
                Delete Problem
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Compiler;


