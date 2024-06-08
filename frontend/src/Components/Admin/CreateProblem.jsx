import axios from 'axios';
import React, { useState } from 'react';

const CreateProblem = () => {
    const [pid, setPid] = useState();
    const [pName, setpName] = useState();
    const [statement, setStatement] = useState();
    const [input, setInput] = useState();
    const [output, setOutput] = useState();

    const createP = async () => {
        const response = await axios.post('http://localhost:3001/api/questions/createQ', {
            pid: pid,
            pName:pName,
            statement:statement
        });
        console.log(response);
    };

    const createTC = async () => {
        const response = await axios.post('http://localhost:3001/api/testcases/createTC', {
            pid: pid,
            input: input,
            output: output,
        });
        console.log(response);
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
                <textarea cols={80} row={10} onChange={(e) => setpName(e.target.value)}></textarea>
            </div>
            <div>
                <span>Statement:</span>
                <textarea cols={80} row={10} onChange={(e) => setStatement(e.target.value)}></textarea>
            </div>
            <div>
                <span>Input:</span>
                <textarea cols={80} row={10} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>
            <div>
                <span>Output:</span>
                <textarea cols={80} row={10} onChange={(e) => setOutput(e.target.value)}></textarea>
            </div>
            <div>
                <button onClick={() => createP()}>Upload Problem</button>
                <button onClick={() => createTC()}>Upload Test Cases</button>
            </div>
        </div>
    );
};

export default CreateProblem;
