const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = block_user =(user_id)=>{
    return new Promise((resolve,reject)=>{

        db.get()
          .collection(collections.USER_COLLECTION)
          .updateOne(
            { _id: object_id(user_id) },
            {
              $set: {
                "status":"blocked"
              },
            }
          ).then(response=>{
        resolve({status:true})
    }).catch(err=>{
        console.log({update_err:err});
        reject({status:false})
    })

    })
    
}