// const  modelQ=require("../models/questions.js")

// const createQ=async(req,res)=>{
//   try{
//     const {pid,pName,statement}=req.body;
//     if(!pName || !statement || !pid){
//         return res.status(400).json({message:"Please fill all the details"});
//     }
//     const existingQuestion=await modelQ.modelQ.findOne({pName});
//     if(existingQuestion){
//         return res.status(400).json({message:"Question already exists"});
//     }
//     const newQuestion=await modelQ.modelQ.create({pid:pid, pName:pName, statement:statement});
//     await newQuestion.save();
//     res.status(200).json({message:"Question has been created"})
//   }catch(error){
//     res.status(500).json({message:"Something went wrong while creating the question"})
//   }
// }

// const readQ=async(req,res)=>{
//    try{
//       const {pName}=req.body;
//       if(!pName){
//          return res.status(400).json({message:"Please provide the name of the question"})
//       }
//       const ques=await modelQ.modelQ.find({pName});
//       if(!ques){
//          return res.status(400).json({message:"Question not found"});
//       }
//       res.status(200).json({data:ques});
//    }catch(error){
//     res.status(500).json({message:"Something went wrong while fetching the question"})
//    }
// }

// const getQ=async(req,res)=>{
//     try{
//       const ques=await modelQ.modelQ.find();
//       res.status(200).json({data:ques})
//     }catch(error){
//         res.status(500).json({message:"Something went wrong while getting all questions"})
//     }
// }

// const updateQ=async(req,res)=>{
//     try{
//       const {pid,pName,statement}=req.body;
//       if(!statement){
//         return res.status(400).json({message:"Please provide the content to update"})
//       }
//       const existingQuestion=await modelQ.modelQ.findOne({pName});
//       if(!existingQuestion){
//         return res.status(400).json({message:"Question not found"});
//       }
      
//       const response=await modelQ.modelQ.updateOne({pName:pName}, {$set:{statement:statement}});
//       res.status(200).json({message:response});
//     }catch(error){
//         res.status(500).json({message:"Something went wrong while updating the question"})
//     }
// }

// const deleteQ=async(req,res)=>{
//   try{
//     const {pName}=req.body;
//     if(!pName){
//         return res.status(400).json({message:"Please specify which question to delete"})
//     }
//     const existingQuestion=await modelQ.modelQ.findOne({pName});
//     if(!existingQuestion){
//         return res.status(400).json({message:"Question not found"});
//     }
   
//     const response=await modelQ.modelQ.deleteOne({pName:pName});
//     res.status(200).json({message:response})
//   }catch(error){
//     res.status(500).json({message:"Something went wrong while deleting the question"})
//   }
// }

// // const deleteQ = async (req, res) => {
// //   try {
// //     const { pName } = req.body;
// //     console.log('Attempting to delete question with pName:', pName);

// //     const deletedQuestion = await modelQ.findOneAndDelete({ pName });

// //     if (!deletedQuestion) {
// //       console.log('Question not found for pName:', pName);
// //       return res.status(404).json({ message: 'Question not found' });
// //     }

// //     console.log('Question deleted successfully:', deletedQuestion);
// //     return res.status(200).json({ message: 'Question deleted successfully' });
// //   } catch (error) {
// //     console.error('Error deleting question:', error);
// //     return res.status(500).json({ message: 'Internal server error', error: error.message });
// //   }
// // };

// module.exports = {
//   createQ,
//   readQ,
//   updateQ,
//   deleteQ,
//   getQ,
// };


const { Question } = require("../models/questions.js");

const createQ = async (req, res) => {
  try {
    const { pid, pName, statement, sampleInput, sampleOutput, difficulty, tags } = req.body;

    if (!pid || !pName || !statement || !difficulty) {
      return res.status(400).json({ message: "Please fill all the required details" });
    }

    const existingQuestion = await Question.findOne({ pName });
    if (existingQuestion) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const newQuestion = new Question({
      pid,
      pName,
      statement,
      sampleInput,
      sampleOutput,
      difficulty,
      tags
    });

    await newQuestion.save();
    res.status(200).json({ message: "Question has been created" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while creating the question", error: error.message });
  }
};

const readQ = async (req, res) => {
  try {
    const { pName } = req.body;

    if (!pName) {
      return res.status(400).json({ message: "Please provide the name of the question" });
    }

    const ques = await Question.findOne({ pName });
    if (!ques) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ data: ques });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while fetching the question", error: error.message });
  }
};

const getQ = async (req, res) => {
  try {
    const ques = await Question.find();
    res.status(200).json({ data: ques });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while getting all questions", error: error.message });
  }
};

const updateQ = async (req, res) => {
  try {
    const { pid, pName, statement, sampleInput, sampleOutput, difficulty, tags } = req.body;

    if (!pName) {
      return res.status(400).json({ message: "Please provide the name of the question to update" });
    }

    const existingQuestion = await Question.findOne({ pName });
    if (!existingQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    const updateData = {};
    if (statement) updateData.statement = statement;
    if (sampleInput) updateData.sampleInput = sampleInput;
    if (sampleOutput) updateData.sampleOutput = sampleOutput;
    if (difficulty) updateData.difficulty = difficulty;
    if (tags) updateData.tags = tags;

    const response = await Question.updateOne({ pName }, { $set: updateData });
    res.status(200).json({ message: "Question updated successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while updating the question", error: error.message });
  }
};

const deleteQ = async (req, res) => {
  try {
    const { pName } = req.body;

    if (!pName) {
      return res.status(400).json({ message: "Please specify which question to delete" });
    }

    const existingQuestion = await Question.findOne({ pName });
    if (!existingQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    const response = await Question.deleteOne({ pName });
    res.status(200).json({ message: "Question deleted successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while deleting the question", error: error.message });
  }
};

module.exports = {
  createQ,
  readQ,
  updateQ,
  deleteQ,
  getQ,
};

