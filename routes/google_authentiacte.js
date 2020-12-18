const { Router, response } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var db = require('../config/connection')
var collection = require('../config/collections')
var {OAuth2Client} = require('google-auth-library')
require('dotenv').config()

 const client = new  OAuth2Client(process.env.CLINT_ID)
router.post('/google-login',(req,res)=>{
var {tokenId} = req.body;
client.verifyIdToken({idToken:tokenId,audience:process.env.CLINT_ID}).then(response=>{
    const {email_verified,name,email} = response.payload;
    // console.log(response.payload);
    if(email_verified){
        db.get().collection(collection.USER_COLLECTION).findOne({email}).then((user)=>{
            // if () {
            //     // return res.json({
            //     //     error:'somthing went wrong'
            //     // })
            // }if{
                if (user) {
                    const data ={
                        id:user._id,
                        name:user.name
                    }
                     let token = jwt.sign(data,process.env.JWT_SECRET, { expiresIn: 86400 });
                     res.send({user_token:token,auth:true})
                }else{
                    let newUser={
                        name:name,
                        email:email,
                    }
                    db.get().collection(collection.USER_COLLECTION).insertOne(newUser).then(response=>{
                         const data ={
                        id:response.ops[0]._id,
                        name:response.ops[0].name
                    }
                     let token = jwt.sign(data,process.env.JWT_SECRET, { expiresIn: 86400 });
                     res.send({user_token:token,auth:true})
                        console.log(response.ops[0]);
                    })

                }
            // }
        })
    }
})
})
module.exports = router;