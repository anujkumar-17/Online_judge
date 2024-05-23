const express=require('express');
const router=express.Router();
const authController=require('../controllers/user');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);

module.exports=router;