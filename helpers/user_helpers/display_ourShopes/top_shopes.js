const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;
var array_shuffler = require('../../globel/array_shuffle');

module.exports = display_vendor =(per_page,page)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.VENDOR_COLLECTION).find().toArray().then(response=>{
            //    console.log(response);
               array_shuffler(response).then(async(shuffled_item) => {
                 let For_items = await shuffled_item.splice(0,4)
                //  console.log(For_items);
                 resolve(For_items);
               });
            
                
          })
    })
}