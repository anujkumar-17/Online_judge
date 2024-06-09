import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Compiler = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');

  const location = useLocation();
  const problemTitle = location.state?.problemTitle || '';

  useEffect(() => {
    // Fetch problem statement or initial code based on the problemTitle
    // and update the code state accordingly
    // Example:
    // axios.get(`/api/problems/${problemTitle}`)
    //   .then(response => setCode(response.data.code))
    //   .catch(error => console.error(error));
  }, [problemTitle]);

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post('http://localhost:3001/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
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

  const runTheCode = () => {
    handleSubmit();
  };

  return (
    <div className="compiler-container">
      <h2>Problem: {problemTitle}</h2>
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
        <button className="run-button" onClick={() => runTheCode()}>
          Run
        </button>
      </div>
      <style>{`
        /* ... (existing styles) */
      `}</style>
    </div>
  );
};

export default Compiler;