require("dotenv");
var collection = require("../../config/collections");
var db = require("../../config/connection");
var object_id = require("mongodb").ObjectID;
var jwt_based = require("../globel/jwt_token_decodeder");
var array_shuffler = require('../globel/array_shuffle');


module.exports = {
  popular_food:()=>{

      return new Promise((resolve,reject)=>{
          
            
          
          db.get().collection(collection.ITEM_COLLECTION).find().toArray().then(response=>{
            //    console.log(response);
               array_shuffler(response).then(async(shuffled_item) => {
                 let For_items = await shuffled_item.splice(0,4)
                //  console.log(For_items);
                 resolve(For_items);
               });
            
                
          })
      })
  }
};