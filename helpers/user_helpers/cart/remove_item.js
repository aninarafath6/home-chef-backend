const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = remove_item = (data) => {
  return new Promise((resolve, reject) => {
    db.get()
      .collection(collections.USER_CART_COLLECTION)
      .updateOne(
        { _id: object_id(data.cart_id) },
        {
          $pull: { cart_items: { item: object_id(data.item_id) } },
        }
      )
      .then((response) => {
        resolve({ removeItem: true });
      });
  });
};