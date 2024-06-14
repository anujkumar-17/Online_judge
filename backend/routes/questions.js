const express=require('express');
const { createQ, readQ, updateQ, deleteQ, getQ } = require('../controllers/questions');
const router=express.Router();

router.post ("/createQ",createQ);
router.get("/",readQ);
router.put("/updateQ",updateQ);
router.delete("/deleteQ",deleteQ);
router.get("/getquestions",getQ);

module.exports=router