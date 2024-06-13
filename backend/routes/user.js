const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUserProfile,} = require('../controllers/user');
// const authenticateUser = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/profile', authMiddleware.authenticateUser, userController.getUserProfile);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;