const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { DBConnection } = require('./database/db');
const userRoutes = require('./routes/user');
const questionsRoute = require('./routes/questions.js');
const testcasesRoute = require('./routes/testcases.js');
const adminRoutes = require('./routes/admin');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { generateInputFile } = require('./generateInputFile');
const { fetchProblemStatement } = require('./getquestions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
DBConnection();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/questions", questionsRoute);
app.use("/api/testcases", testcasesRoute);

app.get('/api/questions/getquestions/:id', async (req, res) => {
  try {
    const problemStatement = await fetchProblemStatement(req.params.id);
    if (problemStatement) {
      res.json({ problemStatement });
    } else {
      res.status(404).json({ error: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post("/api/run", async (req, res) => {
  const { language = 'cpp', code, input } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath, inputPath);
    return res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/evaluate', async (req, res) => {
  const { language, code, testCases } = req.body;

  try {
    const filePath = await generateFile(language, code);
    let isAccepted = true;

    for (const testCase of testCases) {
      const output = await executeCpp(filePath, testCase.input);
      if (output.trim() !== testCase.expectedOutput.trim()) {
        isAccepted = false;
        break;
      }
    }

    res.json({ isAccepted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
