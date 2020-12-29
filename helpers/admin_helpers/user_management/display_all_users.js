const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;

module.exports =display_all_users =  ()=>{
return new Promise((resolve,reject)=>{
    db.get().collection(collections.USER_COLLECTION).find({}).toArray().then(response=>{
        resolve(response)
        console.log(response);
    })
})


}