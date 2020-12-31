const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = display_category =()=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.CATEGORY_COLLECTION).find({}).toArray().then(response=>{
            resolve({data:response})
        });
    })
}