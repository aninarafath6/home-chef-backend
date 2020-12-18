require("dotenv");
var collection = require("../../config/collections");
var db = require("../../config/connection");
var object_id = require("mongodb").ObjectID;
var jwt_based = require("../globel/jwt_token_decodeder");


module.exports = remove_item = (item_id) => {
  return new Promise((resolve, reject) => {
    // console.log({item_id_for_remove_item:item_id});
    db.get()
      .collection(collection.ITEM_COLLECTION)
      .deleteOne({ _id: object_id(item_id) })
      .then((response, err) => {
        if (err) {
          reject({ status: false, msg: "Error !! pls tray again " });
        }
        resolve({ msg: "you are selected item is removed ", status: true });
      });
  });
};