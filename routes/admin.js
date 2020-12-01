const { Router, response } = require('express');
var express = require('express');
var router = express.Router();
var admin_helpers = require('../helpers/admin_helper')
var jwt = require("jsonwebtoken");
var validUser = require('../helpers/valid_user')
router.post('/login', (req, res) => {
    admin_helpers.isLogin(req.body).then((response) => {

        if (response.login) {
            let data = {
                id: response.admin._id,
                name: response.admin.name

            }
            let token = jwt.sign(data, "key", { expiresIn: 86400 });
            response.token = token;
            res.send(response)
        }else{
            res.send(response)
            
        }

    })

})

router.post('/add-vendor',(req,res)=>{
   admin_helpers.add_vendor(req.body).then((id)=>{
          let img=req.files.image;
          img.mv("./public/vendor_images/" + id + ".jpg",(err, done) => {
      if (err){
                 res.send({status:false})

      };
   


    })
       res.send({status:true})
})
 
})

router.get('/vendors',validUser,(req,res)=>{
    admin_helpers.get_all_vendors().then((response)=>{
        res.send({vendors:response});
    })

})

module.exports = router;