const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{type: String, default: null},
    email:{type: String, unique: true},
    password:{type: String},
    birthYear:{type: Number},
    country:{type: String}
});

module.exports=mongoose.model('User', userSchema);
