// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdateProblem = () => {
//   const [pName, setPName] = useState('');
//   const [statement, setStatement] = useState('');
//   const [message, setMessage] = useState('');

//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put('http://localhost:3001/api/questions/updateQ', { pName, statement });
//       setMessage(response.data.message); // Set success message
//       setPName(''); // Clear input after successful update
//       setStatement(''); // Clear input after successful update
//     } catch (error) {
//       console.error('Error updating problem:', error.response?.data?.message || error.message);
//       setMessage('Failed to update problem'); // Set error message
//     }
//   };

//   return (
//     <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//       <h2>Update Problem</h2>
//       <div style={{ marginBottom: '20px' }}>
//         <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Problem Name:</label>
//         <input
//           type="text"
//           value={pName}
//           onChange={(e) => setPName(e.target.value)}
//           style={{
//             padding: '8px',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             width: '300px',
//             color: '#000' // Ensure text color is black
//           }}
//         />
//       </div>
//       <div style={{ marginBottom: '20px' }}>
//         <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Statement:</label>
//         <textarea
//           value={statement}
//           onChange={(e) => setStatement(e.target.value)}
//           style={{
//             padding: '8px',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             width: '300px',
//             minHeight: '100px',
//             color: '#000' // Ensure text color is black
//           }}
//         />
//       </div>
//       <button
//         onClick={handleUpdate}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}
//       >
//         Update Problem
//       </button>
//       {message && (
//         <p style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #ced4da', borderRadius: '5px', color: '#007bff' }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default UpdateProblem;

import React, { useState } from 'react';
import axios from 'axios';

const UpdateProblem = () => {
  const [formData, setFormData] = useState({
    pName: '',
    statement: '',
    sampleInput: '',
    sampleOutput: '',
    difficulty: '',
    tags: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:3001/api/questions/updateQ', formData);
      setMessage(response.data.message); // Set success message
      setFormData({
        pName: '',
        statement: '',
        sampleInput: '',
        sampleOutput: '',
        difficulty: '',
        tags: '',
      }); // Clear input after successful update
    } catch (error) {
      console.error('Error updating problem:', error.response?.data?.message || error.message);
      setMessage('Failed to update problem'); // Set error message
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Update Problem</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Problem Name:</label>
        <input
          type="text"
          name="pName"
          value={formData.pName}
          onChange={handleChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            color: '#000', // Ensure text color is black
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Statement:</label>
        <textarea
          name="statement"
          value={formData.statement}
          onChange={handleChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            minHeight: '100px',
            color: '#000', // Ensure text color is black
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Sample Input:</label>
        <textarea
          name="sampleInput"
          value={formData.sampleInput}
          onChange={handleChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            minHeight: '50px',
            color: '#000', // Ensure text color is black
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Sample Output:</label>
        <textarea
          name="sampleOutput"
          value={formData.sampleOutput}
          onChange={handleChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            minHeight: '50px',
            color: '#000', // Ensure text color is black
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Difficulty:</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            color: '#000', // Ensure text color is black
          }}
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Tags (comma separated):</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '300px',
            color: '#000', // Ensure text color is black
          }}
        />
      </div>
      <button
        onClick={handleUpdate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Update Problem
      </button>
      {message && (
        <p
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            color: '#007bff',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateProblem;

