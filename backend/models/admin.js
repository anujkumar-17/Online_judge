const mongoose=require('mongoose');

const adminSchema=new mongoose.Schema({
  username:{type: String,required: true,},
  email:{type: String,unique: true,required: true,},
  password:{type: String,required: true,},
  birthYear:{type: Number,required: true,},
  country:{type: String,required: true,},
  role: {type: String,default: 'admin',},
},
{timestamps:true});

module.exports = mongoose.model('Admin', adminSchema);
