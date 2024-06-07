const mongoose=require('mongoose');
const testcaseSchema=new mongoose.Schema({
    pid:{
        type:Number,
        required:true,
    },
    input:{
        type:Array,
        required:true,
    },
    output:{
        type:Array,
        required:true
    }
},{timestamps:true})

const modelTC=mongoose.model('TestCases',testcaseSchema);
module.exports={modelTC}