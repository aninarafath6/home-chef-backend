const { Router, response } = require('express');
var express = require('express');
var router = express.Router(); 

var validUser = require('../helpers/valid_user')


router.get('/dashbord',validUser,(req,res)=>{

})
module.exports=router;