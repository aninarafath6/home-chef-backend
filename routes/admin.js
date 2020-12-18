const { Router, response } = require("express");
var express = require("express");
var router = express.Router();
var vendor_management = require("../helpers/admin_helpers/vendor_management");
var authentication  = require('../helpers/admin_helpers/authentication')
var jwt = require("jsonwebtoken");
var validUser = require("../helpers/valid_user");
router.post("/login", (req, res) => {
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

router.post("/add-vendor", (req, res) => {
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

router.get("/vendors", (req, res) => {
  vendor_management.get_all_vendors().then((response) => {
    res.send({ vendors: response });
  });
});

router.get("/uneditedData/", (req, res) => {
  vendor_management.uneditedData(req.query.id).then((response) => {
    res.send({ vendor: response });
  });
});

router.post("/update-vendor/:id", (req, res) => {
  console.log(req.body);
  vendor_management.update_vendor(req.body, req.params.id).then((response) => {
    let img = req.files.img;
    img.mv("./public/vendor_images/" + req.params.id + ".jpg", (err, done) => {
      if (err) {
        res.send({ status: false });
      }
    });
    res.redirect("http://localhost:3000/vendor");
  });
});

router.post("/remove_vendor", (req, res) => {
   
  vendor_management.remove_a_vendor(req.body.id).then((response) => {
    console.log(response);
    res.send({ok:true});
  });
});
module.exports = router;
