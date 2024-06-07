const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/user');

const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, birthYear, country } = req.body;
    console.log('Received registration admin data:',{username,email,password,birthYear,country,});


    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      birthYear,
      country,
      role:'admin'
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering the admin', error });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminId: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: 'admin' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in', error });
  }
};

const getAdminDashboard = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Fetch data for the admin dashboard
    const dashboardData = {
      // ... fetch necessary data for the dashboard
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the admin dashboard', error });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
};
