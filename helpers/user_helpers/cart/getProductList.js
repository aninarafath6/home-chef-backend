const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = getProductList =(un_decoded_token)=>{
    return new Promise(async(resolve,reject)=>{
           let decoded_token = await jwt_based.token_decoder(un_decoded_token);
            let cart = await db.get()
             .collection(collections.USER_CART_COLLECTION)
             .findOne({ user_id: object_id(decoded_token.id) })
              
          if(cart){
             db.get()
               .collection(collections.USER_CART_COLLECTION)
               .findOne({ user_id: object_id(decoded_token.id) })
               .then((response) => { resolve(response.cart_items);});
          }
    })
}