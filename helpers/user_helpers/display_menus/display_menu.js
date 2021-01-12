const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = display_menu =(vendor_id)=>{
    
return new Promise((resolve,reject)=>{
    db.get().collection(collections.ITEM_COLLECTION).find({ vendor_id: vendor_id}).toArray().then(response=>{
        resolve(response)
    })
})
}