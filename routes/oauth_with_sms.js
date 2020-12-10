const { Router, response } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const client = require('twilio')(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN)
    router.post('/login',(req,res)=>{
console.log(req.body);
    client.verify.services(process.env.SERVICE_SID).verifications.create(
    { 
        to:`+${req.body.phone}`,
        channel:"sms"
    }
    ).then((response)=>{
        res.send(response)
        // console.log(response);
    })

    })
router.post('/verify',(req,res)=>{
    console.log(req.body);

client
.verify
.services(process.env.SERVICE_SID)
.verificationChecks
.create(
    { 
        to:`+${req.body.phone}`,
        code:req.body.code,
        }
    ).then((response)=>{
        res.status(200).send(response)
        // console.log(response);
    })
})


module.exports = router;