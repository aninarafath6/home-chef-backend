const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;

module.exports = dashboard =()=>{

    return new Promise(async(resolve,reject)=>{
        let  order_count= await db.get().collection(collections.ORDER_COLLECTION).find({}).toArray();
        let  vendors_count = await db.get().collection(collections.VENDOR_COLLECTION).find({}).toArray();
        let  category_count =  await db.get().collection(collections.CATEGORY_COLLECTION).find({}).toArray();
        let user_count =  await db.get().collection(collections.USER_COLLECTION).find({}).toArray();

        resolve({
          order_count: order_count.length,
          vendor_count: vendors_count.length,
          category_count: category_count.length,
          user_count:user_count.length
        });
       
    })
    
}

