const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;

module.exports = cart_count = (token) => {
  return new Promise(async (resolve, reject) => {
    let decoded_token = await jwt_based.token_decoder(token);

    let count = null;
    let cart = await db
      .get()
      .collection(collections.USER_CART_COLLECTION)
      .findOne({ user_id: object_id(decoded_token.id) });
    if (cart) {
      console.log("user cart is exsist");
      count = cart.cart_items.length;
      resolve(count);
    } else {
      console.log("user cart is  not exsist");
    }
  });
};