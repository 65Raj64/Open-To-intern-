const express = require('express');
const codecontrol=require('../controller/collegecodecontrol')
const interns=require('../controller/interncodecontrol')
const router=express.Router();

router.post('/functionup/colleges',codecontrol.createcollege)
router.post('/functionup/interns',interns.createintrn)
router.get('/functionup/collegeDetails',interns.getcollege)

module.exports=router