const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = display_vendor =(per_page,page)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.VENDOR_COLLECTION).find().toArray().then(async(response)=>{
        
        resolve(response)
        
        })
       
    })
}