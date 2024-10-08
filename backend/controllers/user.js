const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, birthYear, country } = req.body;
    console.log('Received registration user data:', { username, email, password, birthYear, country });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      birthYear,
      country,
      role: 'user',
    });
    await newUser.save();
    const token = jwt.sign(
      { email: newUser.email },
      'f3a95c1746c9b8991c2c30f7bbd6b1d91b36e11a1d4765040ef85b1c55ab768a', // Replace with your actual secret key
      { expiresIn: '1h' } // Token expiration time (1 hour in this case)
    );
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'An error occurred while registering the user', error });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'An error occurred while logging in', error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'An error occurred while fetching the user profile', error });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is passed in the Authorization header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the JWT token
    const userEmail = decodedToken.email; // Assuming the user's email is stored in the decoded token

    const user = await User.findOne({ email: userEmail }).select('-password'); // Retrieve the user data from the database based on the email, excluding the password field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUser
};
