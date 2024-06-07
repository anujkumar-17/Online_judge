import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';

const Compiler = ({ question }) => {
  const [code, setCode] = useState(`   
  #include <bits/stdc++.h>    
  using namespace std;   
  int main() {        
    // Write your code here       
       std::cout << "hi i am anuj!";               
       return 0;    
  }`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [testInput, setTestInput] = useState('');

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input: testInput,
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
    console.log(language);
  };

  const updateCode = (value) => {
    setCode(value);
    console.log(code);
  };

  const updateInput = (value) => {
    setTestInput(value);
    console.log(testInput);
  };

  const runTheCode = () => {
    handleSubmit();
  };

  return (
    <>
      <div>
        <div className="EditorQuestionTag">
          <h2>Question: {question}</h2>
        </div>
        <div className="Editor">
          <div>
            <select
              className="LanguageSelection"
              name="language"
              value={language}
              onChange={selectedLang}
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="py">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div>
            <div>
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
                  minHeight: '300px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  overflowY: 'auto',
                }}
              />
            </div>
            <div>
              <input type="file" />
            </div>
          </div>
          <div className="EditorInputOutputButtons">
            <div className="EditorInputOutput">
              <textarea
                name="paragraph_text"
                cols={50}
                rows={10}
                onChange={(e) => updateInput(e.target.value)}
              ></textarea>
              <div className="EditorOutput">{output}</div>
            </div>
            <div className="EditorButtons">
              <button className="EditorRun" onClick={() => runTheCode()}>
                Run
              </button>
              <button className="EditorSubmit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compiler;


// import React, { useState } from 'react';
// import Editor from 'react-simple-code-editor';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism-tomorrow.css';
// import axios from 'axios';

// function Compiler() {
//   const [code, setCode] = useState(`
//   #include <bits/stdc++.h> 
//   using namespace std;
//   int main() { 
//       // Write your code here
//       std::cout << "hi i am anuj!"; 
      
//       return 0; 
//   }`);
//   const [output, setOutput] = useState('');
//   const [language, setLanguage] = useState('cpp');

//   const handleSubmit = async () => {
//     const payload = {
//       language,
//       code
//     };

//     try {
//       const { data } = await axios.post('http://localhost:3001/run', payload);
//       console.log(data);
//       setOutput(data.output);
//     } catch (error) {
//       console.log(error.response);
//     }
//   }

//   return (
//     <div className="compiler-container">
//       <style>{`
//         .compiler-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding: 20px;
//         }

//         .compiler-title {
//           font-size: 2em;
//           margin-bottom: 20px;
//           color: #333;
//         }

//         .compiler-select {
//           margin-bottom: 20px;
//           padding: 10px;
//           font-size: 1em;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//         }

//         .editor-container {
//           width: 100%;
//           max-width: 800px;
//           margin-bottom: 20px;
//         }

//         .run-button {
//           padding: 10px 20px;
//           font-size: 1em;
//           color: white;
//           background-color: #007BFF;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//           margin-bottom: 20px;
//         }

//         .run-button:hover {
//           background-color: #0056b3;
//         }

//         .output-container {
//           width: 100%;
//           max-width: 800px;
//           background-color: #f1f1f1;
//           padding: 20px;
//           border-radius: 5px;
//           border: 1px solid #ddd;
//         }

//         .output-text {
//           font-family: 'Fira code', 'Fira Mono', monospace;
//           font-size: 14px;
//           color: #333;
//         }
//       `}</style>

//       <h1 className="compiler-title">Welcome to Anuj's Online Compiler</h1>
//       <select 
//         className="compiler-select" 
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//       >
//         <option value='cpp'>C++</option>
//         <option value='c'>C</option>
//         <option value='py'>Python</option>
//         <option value='java'>Java</option>
//       </select>
//       <div className="editor-container">
//         <Editor
//           value={code}
//           onValueChange={code => setCode(code)}
//           highlight={code => highlight(code, languages.js)}
//           padding={10}
//           style={{
//             fontFamily: '"Fira code", "Fira Mono", monospace',
//             fontSize: 14,
//             backgroundColor: '#2d2d2d',
//             color: '#f8f8f2',
//             minHeight: '300px',
//             borderRadius: '5px',
//             border: '1px solid #ddd',
//             overflowY: 'auto',
//           }}
//         />
//       </div>

//       <button onClick={handleSubmit} className="run-button">
//         Run Code
//       </button>

//       {output && (
//         <div className="output-container">
//           <pre className="output-text">{output}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Compiler;
