import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Compiler.css';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');

  const { pid } = useParams();
  console.log(pid);
  useEffect(() => {
    const fetchProblemStatement = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/questions/getquestions/${pid}`);
        setProblemStatement(response.data.problemStatement);
      } catch (error) {
        console.error('Error fetching problem statement:', error);
      }
    };

    fetchProblemStatement();
  }, [pid]);

  const runTheCode = async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post('http://localhost:3001/api/run', payload);
      console.log(data);
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
  
    console.log('Request payload:', payload);
    try {
      const { data } = await axios.post('http://localhost:3001/api/evaluate', payload);
      setEvaluationResult(data.isAccepted ? 'Accepted' : 'Not Accepted');
      setOutput(data.testCaseResults
        .map((result) => `Test Case ${result.id}${result.passed ? ' Passed' : ' Failed'}:
    Input: ${result.input}
    Expected Output: ${result.expectedOutput}
    Actual Output: ${result.actualOutput}`)
        .join('\n\n'));
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
    <div className="compiler-container">
      <h2>Problem: {pid}</h2>
      <div className="problem-statement-container">
        <h3>Problem Statement</h3>
        <div className="problem-statement">{problemStatement}</div>
      </div>
      <div className="editor-container">
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
        </div>
      </div>
      <div className="input-output-container">
        <div className="input-section">
          <h3>Input</h3>
          <textarea
            placeholder="Enter input"
            value={input}
            onChange={(e) => updateInput(e.target.value)}
          ></textarea>
        </div>
        <div className="output-section">
          <h3>Output</h3>
          <div className="output-box">{output}</div>
        </div>
        <button className="run-button" onClick={runTheCode}>
          Run
        </button>
      </div>
      <button className="submit-button" onClick={evaluateCode}>
        Submit
      </button>
      <div className="evaluation-result">{evaluationResult}</div>
    </div>
  );
};

export default Compiler;


// import React, { useState, useEffect } from 'react';
// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism-tomorrow.css';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import './Compiler.css';

// const Compiler = () => {
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');
//   const [language, setLanguage] = useState('cpp');
//   const [input, setInput] = useState('');
//   const [problemStatement, setProblemStatement] = useState('');
//   const [evaluationResult, setEvaluationResult] = useState('');

//   const location = useLocation();
//   const pID = location.state?.pid || '';

//   useEffect(() => {
//     const fetchProblemStatement = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/questions/${pID}`);
//         setProblemStatement(response.data.problemStatement);
//       } catch (error) {
//         console.error('Error fetching problem statement:', error);
//       }
//     };

//     fetchProblemStatement();
//   }, [pID]);

//   const runTheCode = async () => {
//     const payload = {
//       language,
//       code,
//       input,
//     };

//     try {
//       const { data } = await axios.post('http://localhost:3001/api/run', payload);
//       console.log(data);
//       setOutput(data.output);
//     } catch (error) {
//       console.log(error.response);
//     }
//   };

//   const evaluateCode = async () => {
//     const payload = {
//       language,
//       code,
//       testCases: [
//         {
//           input: input,
//           expectedOutput: '', 
//         },
//       ],
//     };

//     try {
//       const { data } = await axios.post('http://localhost:3001/api/evaluate', payload);
//       setEvaluationResult(data.isAccepted ? 'Accepted' : 'Not Accepted');
//     } catch (error) {
//       console.log(error.response);
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
//       <h2>Problem: {pID}</h2>
//       <div className="problem-statement-container">
//         <h3>Problem Statement</h3>
//         <div className="problem-statement">{problemStatement}</div>
//       </div>
//       <div className="editor-container">
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
//         </div>
//       </div>
//       <div className="input-output-container">
//         <div className="input-section">
//           <h3>Input</h3>
//           <textarea
//             placeholder="Enter input"
//             value={input}
//             onChange={(e) => updateInput(e.target.value)}
//           ></textarea>
//         </div>
//         <div className="output-section">
//           <h3>Output</h3>
//           <div className="output-box">{output}</div>
//         </div>
//         <button className="run-button" onClick={runTheCode}>
//           Run
//         </button>
//       </div>
//       <button className="submit-button" onClick={evaluateCode}>
//         Submit
//       </button>
//       <div className="evaluation-result">{evaluationResult}</div>
//     </div>
//   );
// };

// export default Compiler;