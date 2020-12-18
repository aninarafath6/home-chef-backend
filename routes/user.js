const { Router, response } = require('express');
var express = require('express');
var router = express.Router(); 
var user_auth = require('../helpers/user_helpers/user_auth')
var home_page_based = require('../helpers/user_helpers/home_page_based')
var is_logged_user = require('../helpers/valid_user')
var add_to_cart = require('../helpers/user_helpers/cart/add_to_cart')
var display_cart = require('../helpers/user_helpers/cart/display_cart')
var cart_count = require('../helpers/user_helpers/cart/cart_count')
var change_quantity = require('../helpers/user_helpers/cart/change_quantity')
    router.post('/signup',(req,res)=>{
    user_auth.user_signup(req.body).then((response) => {
      res.send({
        user_token: response.token,
        user_already: response.user_already,
        user_signup: response.user_signup,
      });
      // console.log(response);
    });
    })

router.get('/isLogged',(req,res)=>{
    user_auth.isLogged(req).then((response) => {
      res.send(response.loggin);
    });
})

router.post('/login',(req,res)=>{

    user_auth.sms_login(req.body.input).then((response) => {
      res.send({
        otp_sended: response.otp_sended,
        type: response.type,
        user: response.user,
      });
      console.log(response);
    });
})

router.post("/verify-otp",(req,res)=>{
    user_auth.verify_otp(req.body).then((response) => {
      res.send({ user_token: response.token, login: response.login });
    });
})

router.post('/verify-password',(req,res)=>{
    user_auth.email_verify(req.body).then((response) => {
      res.send({ user_token: response.token, login: response.login });
      console.log(response);
    });
})


router.get('/get-home-page-items',(req,res)=>{
  home_page_based.popular_food().then((response)=>{
    res.status(200).send({item:response,status:true})
  })
})

router.post('/add-to-cart',is_logged_user,(req,res)=>{
    let token = req.headers.authorazation;

 add_to_cart(req.body.id, token).then((response) => {
   res.send({ response: response });
 });
})

router.get('/user-cart',is_logged_user,(req,res)=>{
    let token = req.headers.authorazation;
    display_cart(token).then(response=>{
      res.send({cart:response})
    })
})

router.get('/cart-count',(req,res)=>{
    let token = req.headers.authorazation;
  cart_count(token).then(response=>{
    // console.log({cart_count:response});
    res.status(200).send({count:response})
  })
});

 router.post('/change-quantity',(req,res)=>{
console.log(req.body)
  change_quantity(req.body).then((response)=>{
    res.send({removeItem:response.removeItem})

  })
 })

module.exports = router;