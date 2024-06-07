const express=require('express');
const { createTC, readTC, updateTC, deleteTC } = require('../controllers/testcases');
const router=express.Router();

router.post("/createTC",createTC);
router.get("/readTC",readTC);
router.patch("/updateTC",updateTC);
router.delete("/deleteTC",deleteTC);

module.exports=router