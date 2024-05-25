const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  username:{type: String,required: true,},
  email:{type: String,unique: true,required: true,},
  password:{type: String,required: true,},
  birthYear:{type: Number,required: true,},
  country:{type: String,required: true,},
});

module.exports = mongoose.model('User', userSchema);
  username:{type: String,required: true},
  email:{ type:String,required:true,unique: true,trim: true},
  password:{ type: String,required: true },
  birthYear:{ type: Number,required: true },
  country:{ type: String,required: true },
});

const User=mongoose.model('User', userSchema);

module.exports=User;
eca54dbf6842d427f4d81c389602132889fbba03
  username:{type: String,required: true},
  email:{ type:String,required:true,unique: true,trim: true},
  password:{ type: String,required: true },
  birthYear:{ type: Number,required: true },
  country:{ type: String,required: true },
});

const User=mongoose.model('User', userSchema);

module.exports=User;
eca54dbf6842d427f4d81c389602132889fbba03
