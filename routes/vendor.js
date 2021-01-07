const { Router, response } = require("express");
var express = require("express");
var router = express.Router();
var vender_auth = require("../helpers/vendor_helpers/vender_auth");
var is_valid_vendor = require("../helpers/valid_user");
var add_food = require("../helpers/vendor_helpers/add_food");
var get_all_food = require("../helpers/vendor_helpers/get_food");
var remove_item = require('../helpers/vendor_helpers/remove_item')
var edit_food_item = require("../helpers/vendor_helpers/edit_food_item");
var fs = require("fs");
const { ok } = require("assert");

router.post("/login", (req, res) => {
  vender_auth.vendor_login(req.body).then((response) => {
    console.log(response);
    res.send({
      vendor_token: response.vendor_token,
      login: response.login,
      err_msg: response.err_msg,
      success_msg: response.success_msg,
    });
  });
});
router.post("/add_vender", is_valid_vendor, (req, res) => {
  let token = req.headers.authorazation;
  add_food(req.body, token).then((response) => {
    console.log(response);
    let img = req.files.image;
    img.mv(`./public/vendor_food_image/${response.id}.jpg`, (err, done) => {
      if (err) {
        console.log(err);
        res.send({ status: false });
      } else {
        res.send({ status: response.status });
      }
    });
  });
});

  router.get("/get_all_prodects", is_valid_vendor, (req, res) => {
    let token = req.headers.authorazation;
    get_all_food(token).then((response) => {
      console.log(response);
      res.send({food_item: response.item });
    });
  });
router.post("/remove-item",is_valid_vendor,(req,res)=>{
  remove_item(req.body.item_id).then(response=>{
    console.log({status:"ok",msg:response.msg});
    res.status(200).send({status:response.status,msg:response.msg})
  })
});
  
router.get('/for-item-edit/:id',is_valid_vendor,(req,res)=>{
edit_food_item.before_edit(req.params.id).then((response) => {
  res.send( response)
});
})

router.post('/edit-food-item',is_valid_vendor,(req,res)=>{
  console.log(req.files);
  edit_food_item.update_item(req.body).then((response)=>{
    let file = req.files;
      console.log(response);
      if(file){
        console.log("have image");
            file.image.mv(
              `./public/vendor_food_image/${req.body._id}.jpg`,
              (err, done) => {
                if (err) {
                  console.log(err);
                  res.send({ status: false });
                } else {
                  res.send({ status: response.status });
                }
              }
            );
      }
      else{
      res.send({ status: response.status });
      console.log("des not have image");
    }
  })
})
module.exports = router;