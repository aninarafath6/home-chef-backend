var express = require('express')
var router = express.Router();
var jwt   = require('jsonwebtoken')

router.get('/isLogged',(req,res)=>{
    let authHedder = req.headers.authorazation;
    if (authHedder ==undefined) {
        console.log("token is undefined");
        res.send({loggin:false})  
        
        
        
    }  else{
    let token =authHedder.split(' ')[1];
    jwt.verify(token,'key',(err,decode)=>{
        if(err) {
            res.send({loggin:false})  

        }else{
        res.send(decode)
        }
    })
   }
})

module.exports = router;