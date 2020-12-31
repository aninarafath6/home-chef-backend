const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = remove_category = (categoryData) => {
  return new Promise((resolve, reject) => {
    db.get()
      .collection(collections.CATEGORY_COLLECTION)
      .remove({ _id: object_id(categoryData._id) })
      .then((response) => {
        resolve();
      });
  });
};