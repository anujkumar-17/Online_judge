const mongoose=require('mongoose');
require('dotenv').config();

const User=require('../models/user'); 

const DBConnection=async() => {
  const MONGO_URI=process.env.MONGO_URI;
  try{
    await mongoose.connect(MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
    // Drop the existing users collection
    //await dropUsersCollection();

    // Create a new users collection with the correct schema and indexes
    //await User.createCollection();
    //console.log('Users collection created');
   }catch (error) {
    console.log('Error while connecting with the database', error.message);
   }
};
const dropUsersCollection=async() => {
  try{
    await User.collection.drop();
    console.log('Existing users collection dropped');
  }
  catch(error){
    if(error.code===26){
      // Collection doesn't exist, so no need to drop it
      console.log('Users collection does not exist');
    } 
    else{
      console.error('Error dropping users collection:', error);
    }
  }
};

module.exports={DBConnection};