const  modelQ=require("../models/questions.js")

const createQ=async(req,res)=>{
  try{
    const {pid,pName,statement}=req.body;
    if(!pName || !statement || !pid){
        return res.status(400).json({message:"Please fill all the details"});
    }
    const existingQuestion=await modelQ.modelQ.findOne({pName});
    if(existingQuestion){
        return res.status(400).json({message:"Question already exists"});
    }
    const newQuestion=await modelQ.modelQ.create({pid:pid, pName:pName, statement:statement});
    await newQuestion.save();
    res.status(200).json({message:"Question has been created"})
  }catch(error){
    res.status(500).json({message:"Something went wrong while creating the question"})
  }
}

const readQ=async(req,res)=>{
   try{
      const {pName}=req.body;
      if(!pName){
         return res.status(400).json({message:"Please provide the name of the question"})
      }
      const ques=await modelQ.modelQ.find({pName});
      if(!ques){
         return res.status(400).json({message:"Question not found"});
      }
      res.status(200).json({data:ques});
   }catch(error){
    res.status(500).json({message:"Something went wrong while fetching the question"})
   }
}

const getQ=async(req,res)=>{
    try{
      const ques=await modelQ.modelQ.find();
      res.status(200).json({data:ques})
    }catch(error){
        res.status(500).json({message:"Something went wrong while getting all questions"})
    }
}

const updateQ=async(req,res)=>{
    try{
      const {pid,pName,statement}=req.body;
      if(!statement){
        return res.status(400).json({message:"Please provide the content to update"})
      }
      const existingQuestion=await modelQ.modelQ.findOne({pName});
      if(!existingQuestion){
        return res.status(400).json({message:"Question not found"});
      }
      
      const response=await modelQ.modelQ.updateOne({pName:pName}, {$set:{statement:statement}});
      res.status(200).json({message:response});
    }catch(error){
        res.status(500).json({message:"Something went wrong while updating the question"})
    }
}

const deleteQ=async(req,res)=>{
  try{
    const {pName}=req.body;
    if(!pName){
        return res.status(400).json({message:"Please specify which question to delete"})
    }
    const existingQuestion=await modelQ.modelQ.findOne({pName});
    if(!existingQuestion){
        return res.status(400).json({message:"Question not found"});
    }
   
    const response=await modelQ.modelQ.deleteOne({pName:pName});
    res.status(200).json({message:response})
  }catch(error){
    res.status(500).json({message:"Something went wrong while deleting the question"})
  }
}
module.exports={
    createQ,
    readQ,
    updateQ,
    deleteQ,
    getQ
}
