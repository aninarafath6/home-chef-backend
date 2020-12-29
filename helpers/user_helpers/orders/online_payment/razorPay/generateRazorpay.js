const collections = require("../../../../../config/collections");
const db = require("../../../../../config/connection");
const jwt_based = require("../../../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

module.exports = generateRazorpay = (order_id, total) => {
  return new Promise((resolve, reject) => {
    console.log("order id is :" + order_id + " total is :" + total);
    var options = {
      amount: total*100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "" + order_id,
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        console.log(err);
        reject(err)
      } else {
        console.log(order);
        resolve(order);
      }
    });
  });
};
