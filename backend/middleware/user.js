// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const Admin = require('../models/user');

// const authenticateUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Invalid token format' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decodedToken.userId;
//     req.role = decodedToken.role;

//     // Check if the user exists and has the correct role
//     const user = await User.findById(req.userId);
//     if (!user || user.role !== 'user') {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     res.status(500).json({ message: 'An error occurred while authenticating the user', error });
//   }
// };

// const authenticateAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Invalid token format' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     req.adminId = decodedToken.adminId;
//     req.role = decodedToken.role;

//     // Check if the admin exists and has the correct role
//     const admin = await Admin.findById(req.adminId);
//     if (!admin || admin.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
//     res.status(500).json({ message: 'An error occurred while authenticating the admin', error });
//   }
// };

// module.exports = {
//   authenticateUser,
//   authenticateAdmin,
// };