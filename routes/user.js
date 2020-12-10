const { Router, response } = require('express');
var express = require('express');
var router = express.Router(); 
var  user_helpers = require('../helpers/user_helpers')


    router.post('/signup',(req,res)=>{
    user_helpers.user_signup(req.body).then(response=>{

        res.send(
            {user_token:response.token,
                user_already:response.user_already,
                user_signup:response.user_signup
            })
        // console.log(response);
    })
    })

router.get('/isLogged',(req,res)=>{
    user_helpers.isLogged(req).then(response=>{
        res.send(response.loggin)
    })
})

router.post('/login',(req,res)=>{

    user_helpers.login(req.body.input).then(response=>{
        res.send({otp_sended:response.otp_sended,type:response.type,user:response.user})
        console.log(response);
    })
})

router.post("/verify-otp",(req,res)=>{
    user_helpers.verify_otp(req.body).then(response=>{
        res.send({user_token:response.token,login:response.login});
    })
})

router.post('/verify-password',(req,res)=>{
    user_helpers.pss_verify(req.body).then(response=>{
        res.send({user_token:response.token,login:response.login});
        console.log(response);
    })
})


module.exports = router;