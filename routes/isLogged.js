var express = require('express')
var router = express.Router();
var jwt   = require('jsonwebtoken')
require('dotenv')
router.get('/isLogged',(req,res)=>{
    let authHedder = req.headers.authorazation;
    console.log(authHedder);
    if (authHedder ==undefined) {
        console.log("token is undefined");
        res.send({loggin:false})  
        
        
        
    }  else{
    let token =authHedder.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err) {
            res.send({loggin:false})  

        }else{
        res.send({loggin:true})
        }
    })
   }
})

module.exports = router;