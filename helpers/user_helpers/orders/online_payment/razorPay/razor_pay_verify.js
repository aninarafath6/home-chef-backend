const collections = require("../../../../../config/collections");
const db = require("../../../../../config/connection");
const jwt_based = require("../../../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;
const crypto = require('crypto');

module.exports = razor_pay_verify =(order_details)=>{
    // console.log(
    //   order_details.payment.razorpay_order_id +
    //     "|" +
    //     order_details.payment.razorpay_payment_id,
    //   order_details.payment.razorpay_signature
    // );
    return new Promise((resolve,reject)=>{
        let hmac = crypto.createHmac("sha256", process.env.key_secret);
        hmac.update(
          order_details.payment.razorpay_order_id +
            "|" +
            order_details.payment.razorpay_payment_id
        );
        hmac = hmac.digest('hex');
        if(hmac == order_details.payment.razorpay_signature){
            resolve({status:true})
        }else{
            reject({status:false})
        }
    })
}