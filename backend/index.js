const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const {DBConnection}=require('./database/db');
const userRoutes=require('./routes/user');
const questionsRoute=require("./routes/questions.js")
const testcasesRoute=require("./routes/testcases.js");
const adminRoutes = require('./routes/admin');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Connect to the database
DBConnection();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/questions",questionsRoute)
app.use("/api/testcases",testcasesRoute)

app.post("/run", async (req, res) => {
  const { language = 'cpp', code } = req.body;
  if (code === undefined) {
      return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
      const filePath = await generateFile(language, code);
      const output = await executeCpp(filePath);
      res.json({ filePath, output });
  } catch (error) {
      res.status(500).json({ error: error });
  }
});

app.listen(PORT,() => {
  console.log(`Server listening on port ${PORT}`);
});