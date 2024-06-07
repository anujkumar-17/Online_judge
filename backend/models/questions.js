const mongoose=require('mongoose');
const questionSchema=new mongoose.Schema({
    pid:{
        type:Number,
        required:true,
    },
    pName:{
        type:String,
        required:true,
    },
    statement:{
        type:String,
        required:true,
    }
},{timestamps:true})

const modelQ=mongoose.model('Questions',questionSchema);
module.exports={modelQ}