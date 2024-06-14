const User = require('../models/user');

// Controller function to fetch all normal users
const getAllNormalUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }); // Fetch users with role 'user'
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

module.exports = {
  getAllNormalUsers
};
