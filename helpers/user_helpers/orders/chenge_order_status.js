const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports=change_order_status =(order_id)=>{
return new Promise((resolve,reject)=>{
db.get()
  .collection(collections.ORDER_COLLECTION)
  .updateOne(
    { _id: object_id(order_id) },
    {
      $set: { status :'placed'},
    }
  ).then(response=>{
      resolve()
  })
})
} 