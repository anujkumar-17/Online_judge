// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateProblem = () => {
//   const [pid, setPid] = useState('');
//   const [pName, setPName] = useState('');
//   const [statement, setStatement] = useState('');
//   const [testCases, setTestCases] = useState([]);

//   const createP = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/questions/createQ', {
//         pid,
//         pName,
//         statement,
//       });
//       console.log(response);
//     } catch (error) {
//       console.error('Error creating problem:', error);
//     }
//   };

//   const createTC = async () => {
//     try {
//       const promises = testCases.map(async (testCase) => {
//         const response = await axios.post('http://localhost:3001/api/testcases/createTC', {
//           pid,
//           pName,
//           input: testCase.input,
//           output: testCase.output,
//         });
//         return response;
//       });

//       const results = await Promise.all(promises);
//       console.log(results);
//     } catch (error) {
//       console.error('Error creating test cases:', error);
//     }
//   };

//   const handleTestCaseChange = (index, field, value) => {
//     const updatedTestCases = [...testCases];
//     updatedTestCases[index][field] = value;
//     setTestCases(updatedTestCases);
//   };

//   const addTestCase = () => {
//     setTestCases([...testCases, { input: '', output: '' }]);
//   };

//   return (
//     <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//       <h2 style={{ textAlign: 'center' }}>Problem Upload</h2>
//       <div style={{ marginBottom: '20px' }}>
//         <span style={{ display: 'block', marginBottom: '5px' }}>PID:</span>
//         <input
//           type="number"
//           value={pid}
//           onChange={(e) => setPid(e.target.value)}
//           style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
//         />
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <span style={{ display: 'block', marginBottom: '5px' }}>Problem Name:</span>
//         <textarea
//           cols={80}
//           rows={2}
//           value={pName}
//           onChange={(e) => setPName(e.target.value)}
//           style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
//         ></textarea>
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <span style={{ display: 'block', marginBottom: '5px' }}>Statement:</span>
//         <textarea
//           cols={80}
//           rows={5}
//           value={statement}
//           onChange={(e) => setStatement(e.target.value)}
//           style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
//         ></textarea>
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <h3>Test Cases</h3>
//         {testCases.map((testCase, index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <div style={{ marginBottom: '10px' }}>
//               <span style={{ display: 'block', marginBottom: '5px' }}>Input:</span>
//               <textarea
//                 cols={80}
//                 rows={3}
//                 value={testCase.input}
//                 onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
//                 style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
//               ></textarea>
//             </div>
//             <div>
//               <span style={{ display: 'block', marginBottom: '5px' }}>Output:</span>
//               <textarea
//                 cols={80}
//                 rows={3}
//                 value={testCase.output}
//                 onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
//                 style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
//               ></textarea>
//             </div>
//           </div>
//         ))}
//         <button onClick={addTestCase} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           Add Test Case
//         </button>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <button onClick={createP} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           Upload Problem
//         </button>
//         <button onClick={createTC} style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//           Upload Test Cases
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateProblem;

import React, { useState } from 'react';
import axios from 'axios';

const CreateProblem = () => {
  const [formData, setFormData] = useState({
    pid: '',
    pName: '',
    statement: '',
    sampleInput: '',
    sampleOutput: '',
    difficulty: '',
    tags: ''
  });

  const [testCases, setTestCases] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createP = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/questions/createQ', formData);
      console.log(response);
    } catch (error) {
      console.error('Error creating problem:', error);
    }
  };

  const createTC = async () => {
    try {
      const promises = testCases.map(async (testCase) => {
        const response = await axios.post('http://localhost:3001/api/testcases/createTC', {
          pid: formData.pid,
          pName: formData.pName,
          input: testCase.input,
          output: testCase.output,
        });
        return response;
      });

      const results = await Promise.all(promises);
      console.log(results);
    } catch (error) {
      console.error('Error creating test cases:', error);
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Problem Upload</h2>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>PID:</span>
        <input
          type="number"
          name="pid"
          value={formData.pid}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>Problem Name:</span>
        <textarea
          name="pName"
          cols={80}
          rows={2}
          value={formData.pName}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>Statement:</span>
        <textarea
          name="statement"
          cols={80}
          rows={5}
          value={formData.statement}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>Sample Input:</span>
        <textarea
          name="sampleInput"
          cols={80}
          rows={3}
          value={formData.sampleInput}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>Sample Output:</span>
        <textarea
          name="sampleOutput"
          cols={80}
          rows={3}
          value={formData.sampleOutput}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>Difficulty:</span>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ display: 'block', marginBottom: '5px' }}>Tags (comma separated):</span>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Test Cases</h3>
        {testCases.map((testCase, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ display: 'block', marginBottom: '5px' }}>Input:</span>
              <textarea
                cols={80}
                rows={3}
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
              ></textarea>
            </div>
            <div>
              <span style={{ display: 'block', marginBottom: '5px' }}>Output:</span>
              <textarea
                cols={80}
                rows={3}
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', color: 'black' }}
              ></textarea>
            </div>
          </div>
        ))}
        <button onClick={addTestCase} style={{ padding: '10px 20px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Test Case
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={createP} style={{ padding: '10px 20px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Upload Problem
        </button>
        <button onClick={createTC} style={{ padding: '10px 20px', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Upload Test Cases
        </button>
      </div>
    </div>
  );
};

export default CreateProblem;

