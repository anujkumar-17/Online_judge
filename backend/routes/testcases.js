const express=require('express');
const { createTC, readTC, updateTC, deleteTC, addTestCase } = require('../controllers/testcases');
const router=express.Router();

router.post("/createTC",createTC);
router.get("/readTC",readTC);
router.patch("/updateTC",updateTC);
router.delete("/deleteTC",deleteTC);
router.post("/addTC",addTestCase);

module.exports=router