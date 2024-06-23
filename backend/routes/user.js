const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getUser } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const UserController = require('../controllers/allusers');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/', getUser); // Add this line
router.get('/allusers', UserController.getAllNormalUsers);

module.exports = router;