const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/user');

// Register a new user
exports.register=async(req, res) => {
    try{
      const{username, email, password, birthYear, country}=req.body;
  
      // Log the received data from the frontend
      console.log('Received registration data:',{
        username,
        email,
        password,
        birthYear,
        country,
      });
  
      // Check if the user already exists
      const existingUser=await User.findOne({ email});
      if (existingUser){
        return res.status(400).json({message: 'User already exists'});
      }
  
      // Hash the password
      const hashedPassword=await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser=new User({
        username,
        email,
        password:hashedPassword,
        birthYear,
        country,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Log a success message
      console.log('User registered successfully:',newUser);
  
      // Generate a token for the user and send it
      const token=jwt.sign({id: newUser._id, email}, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });
  
      newUser.token=token;
      newUser.password=undefined;
  
      res.status(201).json({message: 'User registered successfully',user:newUser});
    } catch (error){
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Login a user
exports.login=async(req,res) => {
  try {
    const{email,password}=req.body;

    // Find the user by email
    const user=await User.findOne({email});
    if (!user){
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid=await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      return res.status(401).json({message: 'Invalid email or password'});
    }

    // Generate a JWT token
    const token=jwt.sign({id: user._id }, process.env.SECRET_KEY,{
      expiresIn: '1d',
    });

    user.token=token;
    user.password=undefined;

    // Store cookies
    const options={
      expires:new Date(Date.now()+24*60*60*1000), // 1 day
      httpOnly:true, // Only manipulate by server, not by client/user
    };

    // Send the token
    res
      .status(200)
      .cookie('token', token, options)
      .json({
        message: 'You have successfully logged in!',
        success: true,
        token,
      });
  } catch(error){
    console.error(error);
    res.status(500).json({ message:'Internal server error'});
  }
};