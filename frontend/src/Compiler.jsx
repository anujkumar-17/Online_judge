import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';

const Compiler = () => {
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
 const [input, setInput] = useState('');

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
     <div className="editor-container">
       <div className="language-selection">
         <select
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
       .compiler-container {
         display: flex;
         justify-content: space-between;
         padding: 20px;
         background-color: #f5f5f5;
       }

       .editor-container {
         width: 60%;
       }

       .language-selection {
         margin-bottom: 10px;
       }

       .code-editor {
         border: 1px solid #ddd;
         border-radius: 5px;
         overflow: hidden;
       }

       .input-output-container {
         width: 35%;
         display: flex;
         flex-direction: column;
       }

       .input-section,
       .output-section {
         border: 1px solid #ddd;
         border-radius: 5px;
         padding: 10px;
         margin-bottom: 10px;
       }

       textarea {
         width: 100%;
         height: 100px;
         resize: vertical;
         font-family: 'Fira code', 'Fira Mono', monospace;
         font-size: 14px;
       }

       .output-box {
         background-color: #2d2d2d;
         color: #f8f8f2;
         padding: 10px;
         min-height: 100px;
         font-family: 'Fira code', 'Fira Mono', monospace;
         font-size: 14px;
         border-radius: 5px;
         overflow: auto;
       }

       .run-button {
         padding: 10px 20px;
         font-size: 1em;
         color: white;
         background-color: #007BFF;
         border: none;
         border-radius: 5px;
         cursor: pointer;
         align-self: flex-end;
       }

       .run-button:hover {
         background-color: #0056b3;
       }
     `}</style>
   </div>
 );
};

export default Compiler;