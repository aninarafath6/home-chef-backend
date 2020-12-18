require("dotenv");
var collection = require("../../config/collections");
var db = require("../../config/connection");
var object_id = require("mongodb").ObjectID;
var jwt_based = require("../globel/jwt_token_decodeder");
module.exports = get_all_food = (un_decoded_token) => {
  return new Promise(async (resolve, reject) => {
    let decoded_data = await jwt_based.token_decoder(un_decoded_token);
   
    let food_items = await db
      .get()
      .collection(collection.ITEM_COLLECTION)
      .find({ vendor_id: decoded_data.id })
      .toArray();

      resolve({item:food_items})
  });
};
