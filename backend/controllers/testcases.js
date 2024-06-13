const TC = require("../models/testcases.js");
const Questions = require("../models/questions.js");

const createTC = async (req, res) => {
   try {
     const { pid, input, output } = req.body;
     if (!pid || !input || !output) {
        return res.status(400).json({ message: "Please provide all details" });
     }
     const question = await Questions.modelQ.findOne({ pid:pid });
     if (!question) {
        return res.status(400).json({ message: "Invalid pid" });
     }
     const response = await TC.modelTC({ pid:pid , input:input , output:output });
     await response.save();
     res.status(200).json({ message: "Test case has been created", data: response });
   } catch(error) {
    res.status(500).json({ message: "Something went wrong while creating the test case" });
   }
}

const readTC = async (req, res) => {
  try {
    const { pid } = req.body;
    if (!pid) {
        return res.status(400).json({ message: "Please provide the id" });
    }
    const tc = await TC.modelTC.find({ pid:pid });
    if (!tc || tc.length === 0) {
        return res.status(400).json({ message: "No test cases found for this id" });
    }
    res.status(200).json({ message: tc });
  } catch(error) {
    res.status(500).json({ message: "Something went wrong while getting the test case" });
  }
}

const updateTC = async (req, res) => {
    try {
        const { pid, input, output } = req.body;
        if (!pid) {
            return res.status(400).json({ message: "Please provide the id" });
        }
        const tc = await TC.modelTC.findOne({ pid:pid });
        if (!tc) {
            return res.status(400).json({ message: "Test case not found" });
        }
        if (input) {
            await TC.modelTC.updateOne({ pid:pid }, { $set: { input:input } });
        }
        if (output) {
            await TC.modelTC.updateOne({ pid:pid }, { $set: { output:output } });
        }
        res.status(200).json({ message: "Test case updated successfully" });
    } catch(error) {
        res.status(500).json({ message: "Something went wrong while updating the test case" });
    }
}

const deleteTC = async (req, res) => {
    try {
       const { pid } = req.body;
       if (!pid) {
         return res.status(400).json({ message: "Please provide the ID" });
       }
       const tc = await TC.modelTC.findOne({ pid:pid });
       if (!tc) {
          return res.status(400).json({ message: "Test case not found" });
       }
       await TC.modelTC.deleteOne({ pid:pid });
       res.status(200).json({ message: "Test case deleted successfully" });
    } catch(error) {
        res.status(500).json({ message: "Something went wrong while deleting the test case" });
    }
}

module.exports = {
    createTC,
    readTC,
    updateTC,
    deleteTC
}