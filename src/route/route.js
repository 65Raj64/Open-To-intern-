const express = require('express');
const codecontrol=require('../controller/collegecodecontrol')
const router=express.Router();

router.post('/functionup/colleges',codecontrol.createcollege)

module.exports=router