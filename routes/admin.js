const { Router, response } = require("express");
var express = require("express");
var router = express.Router();
var vendor_management = require("../helpers/admin_helpers/vendor_management");
var authentication = require("../helpers/admin_helpers/authentication");
var jwt = require("jsonwebtoken");
var validUser = require("../helpers/valid_user");
var display_vendors = require("../helpers/admin_helpers/vendor/display_vendor");
var display_all_users = require("../helpers/admin_helpers/user_management/display_all_users");
var block_user = require('../helpers/admin_helpers/user_management/block_user')
var un_block_user = require('../helpers/admin_helpers/user_management/un_block_user')
var add_category = require('../helpers/admin_helpers/category/add_category')
var display_category = require('../helpers/admin_helpers/category/display_category')
var update_category = require('../helpers/admin_helpers/category/update_category');
var remove_category = require('../helpers/admin_helpers/category/remove_category')
var order_management = require('../helpers/admin_helpers/order_management/order_management')
var dashboard = require('../helpers/admin_helpers/dashboard/dashboard') 
router.post("/login", (req, res) => {
  console.log("at login" + req.body);
  authentication.isLogin(req.body).then((response) => {
    if (response.login) {
      let data = {
        id: response.admin._id,
        name: response.admin.name,
      };
      let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 86400 });
      response.token = token;
      res.send(response);
    } else {
      res.send(response);
    }
  });
});

router.post("/add-vendor", validUser, (req, res) => {
  vendor_management.add_vendor(req.body).then((id) => {
    let img = req.files.image;
    img.mv("./public/vendor_images/" + id + ".jpg", (err, done) => {
      if (err) {
        res.send({ status: false });
      }
    });
    res.send({ status: true });
  });
});

// router.get("/vendors", (req, res) => {
//   vendor_management.get_all_vendors().then((response) => {
//     res.send({ vendors: response });
//   });
// });

router.get("/uneditedData/:id", validUser, (req, res) => {
  console.log(req.params.id0000000)
  vendor_management.uneditedData(req.params.id).then((response) => {
    res.send({ vendor: response });
  });
});

router.post("/update-vendor/:id", (req, res) => {
  console.log(req.body);
  vendor_management.update_vendor(req.body, req.params.id).then((response) => {
    if (req.files) {
      let img = req.files.img;
      img.mv(
        "./public/vendor_images/" + req.params.id + ".jpg",
        (err, done) => {
          if (err) {
            res.send({ status: false });
          }
        }
      );
    }
    res.redirect("http://localhost:3002/vendor");
  });
});

router.post("/remove_vendor", validUser, (req, res) => {
  vendor_management.remove_a_vendor(req.body.id).then((response) => {
    console.log(response);
    res.send({ ok: true });
  });
});
router.get("/vendors", (req, res) => {
  display_vendors().then((response) => {
    res.send({ data: response });
  });
});

router.get("/display-all-users", validUser, (req, res) => {
  display_all_users().then((response) => {
    res.send({data:response});
  });
});

router.post("/block-user",validUser,(req,res)=>{
block_user(req.body.id).then(response=>{
  res.send({status:true})
  
}).catch(err=>{
  res.status(400).send({status:false})
})
});


router.post("/un-block-user",validUser,(req,res)=>{
un_block_user(req.body.id)
  .then((response) => {
    res.send({ status: true });
  })
  .catch((err) => {
    res.status(400).send({ status: false });
  });
});




router.post('/add-category',(req,res)=>{
add_category(req.body).then(response=>{
  res.send(response)
}).catch(err=>{
  res.status(400).send(err)
})

})



router.get('/display-category',(req,res)=>{
  display_category().then(response=>{
    res.send(response)
  })
})


router.post('/update-category',(req,res)=>{
  

  update_category(req.body).then(response=>{
    res.send(response);

  }).catch(err=>{
    res.send(err)
  })
})
dashboard

router.post('/remove-category',(req,res)=>{
remove_category(req.body).then(response=>{
res.send(response)
})
})


router.get("/order-management",(req,res)=>{
  order_management().then(response=>{
    res.send(response);
  
  })
});

router.get('/dashboard',validUser,(req,res)=>{
  dashboard().then(response=>{
    res.send(response)
  })
})

module.exports = router;

