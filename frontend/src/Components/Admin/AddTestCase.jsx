import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

const AddTestCase = () => {
  const [pid, setPid] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTestCase = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/testcases/addTC', {
        pid,
        input,
        output,
      });
      setMessage(response.data.message); // Set success message
      setPid('');
      setInput('');
      setOutput('');
    } catch (error) {
      console.error('Error adding test case:', error.response?.data?.message || error.message);
      setMessage('Failed to add test case'); // Set error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" gutterBottom>
          Add Test Case
        </Typography>
        {message && <Alert severity="error">{message}</Alert>}
        <form onSubmit={handleAddTestCase}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Problem ID"
            type="text"
            value={pid}
            onChange={(e) => setPid(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Output"
            type="text"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Add Test Case
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddTestCase;
