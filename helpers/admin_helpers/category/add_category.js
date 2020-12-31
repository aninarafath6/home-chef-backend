const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = add_category =(category)=>{
     return new Promise((resolve,reject)=>{
           db.get().collection(collections.CATEGORY_COLLECTION).insertOne(category).then(response=>{
               resolve({status:true,alertMSG:'successfully inserted a category'})
           }).catch(err=>{
            console.log({category_insert_err:err});
            reject({status:false,alertMSG:"failed",err:err})
           })
     })
}