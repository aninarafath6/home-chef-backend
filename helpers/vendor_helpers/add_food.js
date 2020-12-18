require("dotenv");
var collection = require("../../config/collections");
var db = require("../../config/connection");
var object_id = require("mongodb").ObjectID;
var jwt_based = require("../globel/jwt_token_decodeder");

module.exports= add_food = (food_item, vendor) => {
  food_item.itemPrice = parseInt(food_item.itemPrice);
  return new Promise(async (resolve, reject) => {
    let decoded_vendor = await jwt_based.token_decoder(vendor);
    food_item.vendor_name = decoded_vendor.name;
    food_item.vendor_id = decoded_vendor.id
    db.get()
      .collection(collection.ITEM_COLLECTION)
      .insertOne(food_item)
      .then((response) => {
        resolve({ status: true, id: response.ops[0]._id });
      });

  });
};

