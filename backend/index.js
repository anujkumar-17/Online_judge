const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const {DBConnection}=require('./database/db');
const authRoutes=require('./routes/user');

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
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT,() => {
  console.log(`Server listening on port ${PORT}`);
});