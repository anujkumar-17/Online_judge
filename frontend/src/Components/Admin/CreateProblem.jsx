import React, { useState } from 'react';
import axios from 'axios';

const CreateProblem = () => {
  const [pid, setPid] = useState();
  const [pName, setPName] = useState();
  const [statement, setStatement] = useState();
  const [testCases, setTestCases] = useState([]);

  const createP = async () => {
    const response = await axios.post('http://localhost:3001/api/questions/createQ', {
      pid,
      pName,
      statement,
    });
    console.log(response);
  };

  const createTC = async () => {
    const promises = testCases.map(async (testCase) => {
      const response = await axios.post('http://localhost:3001/api/testcases/createTC', {
        pid,
        pName,
        input: testCase.input,
        output: testCase.output,
      });
      return response;
    });

    const results = await Promise.all(promises);
    console.log(results);
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
    <div>
      <h2>Problem Upload</h2>
      <div>
        <span>PID:</span>
        <input type="number" onChange={(e) => setPid(e.target.value)} />
      </div>
      <div>
        <span>Problem Name:</span>
        <textarea cols={80} rows={10} onChange={(e) => setPName(e.target.value)}></textarea>
      </div>
      <div>
        <span>Statement:</span>
        <textarea cols={80} rows={10} onChange={(e) => setStatement(e.target.value)}></textarea>
      </div>
      <div>
        <h3>Test Cases</h3>
        {testCases.map((testCase, index) => (
          <div key={index}>
            <div>
              <span>Input:</span>
              <textarea
                cols={80}
                rows={5}
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
              ></textarea>
            </div>
            <div>
              <span>Output:</span>
              <textarea
                cols={80}
                rows={5}
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
              ></textarea>
            </div>
          </div>
        ))}
        <button onClick={addTestCase}>Add Test Case</button>
      </div>
      <div>
        <button onClick={() => createP()}>Upload Problem</button>
        <button onClick={() => createTC()}>Upload Test Cases</button>
      </div>
    </div>
  );
};

export default CreateProblem;