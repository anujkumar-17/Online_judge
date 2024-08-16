// import React, { useState } from 'react';
// import axios from 'axios';

// const DeleteProblem = () => {
//   const [pName, setPName] = useState('');
//   const [message, setMessage] = useState('');

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete('http://localhost:3001/api/questions/deleteQ', { data: { pName } });
//       setMessage(response.data.message); // Set success message
//       setPName(''); // Clear input after successful deletion
//     } catch (error) {
//       console.error('Error deleting problem:', error.response?.data?.message || error.message);
//       setMessage('Failed to delete problem'); // Set error message
//     }
//   };

//   return (
//     <div style={{ margin: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//       <h2>Delete Problem</h2>
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
//       <button
//         onClick={handleDelete}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#dc3545',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}
//       >
//         Delete Problem
//       </button>
//       {message && (
//         <p style={{ marginTop: '10px', padding: '10px', backgroundColor: '#ffffff', border: '1px solid #ced4da', borderRadius: '5px', color: '#dc3545' }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default DeleteProblem;


import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const DeleteProblem = ({ problem, onDelete }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      //http://localhost:3001/api/questions/deleteQ
      const response = await axios.delete('http://3.110.249.20:3001/api/questions/deleteQ', { data: { pName: problem.pName } });
      setMessage(response.data.message); // Set success message
      onDelete(problem.pName); // Notify parent component (Problems) about the deletion
    } catch (error) {
      console.error('Error deleting problem:', error.response?.data?.message || error.message);
      setMessage('Failed to delete problem'); // Set error message
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleDelete}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </Button>
      {message && (
        <p style={{ marginLeft: '10px', color: '#000' }}>{message}</p>
      )}
    </>
  );
};

export default DeleteProblem;
