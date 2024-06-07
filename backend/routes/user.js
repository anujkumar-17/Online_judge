const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUserProfile,} = require('../controllers/user');
// const authMiddleware = require('../middleware/user');

// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/profile', authMiddleware.authenticateUser, userController.getUserProfile);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

module.exports = router;