const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  username:{type: String,required: true,},
  email:{type: String,unique: true,required: true,},
  password:{type: String,required: true,},
  birthYear:{type: Number,required: true,},
  country:{type: String,required: true,},
  role: {type: String,default: 'user',},
},
{timestamps:true});

module.exports = mongoose.model('User', userSchema);

