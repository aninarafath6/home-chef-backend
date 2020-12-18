require("dotenv");
var collection = require("../../config/collections");
var db = require("../../config/connection");
var object_id = require("mongodb").ObjectID;
var jwt_based = require("../globel/jwt_token_decodeder");

module.exports = {
  before_edit: (item_id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ITEM_COLLECTION)
        .findOne({ _id: object_id(item_id) })
        .then((response) => {
          // console.log(response);
          resolve({ data: response });
        });
    });
  },
  update_item:(edited_data)=>{
      return new Promise((resolve,reject)=>{
        //   console.log(edited_data);
        db.get()
          .collection(collection.ITEM_COLLECTION)
          .updateOne(
            {
              _id: object_id(edited_data._id),
            },
            {
              $set: {
                item_name: edited_data.item_name,
                itemPrice: edited_data.itemPrice,
                description: edited_data.description,
                category: edited_data.category,
                short_description: edited_data.short_description,
              },
            }
          )
          .then((response) => {
            resolve({ status: true });
          });
      })

  }
};
