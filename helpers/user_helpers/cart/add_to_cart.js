const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;
module.exports = add_to_cart = (item_id, token) => {
  return new Promise(async (resolve, reject) => {
    let product_object = {
      item: object_id(item_id),
      quantity: 1,
    };
    let decoded_token = await jwt_based.token_decoder(token);
    // console.log(item_id);
    let user_cart = await db
      .get()
      .collection(collections.USER_CART_COLLECTION)
      .findOne({ user_id: object_id(decoded_token.id) });

    if (user_cart) {
      console.log("user cart is already exist");
      let item_exist = user_cart.cart_items.findIndex(
        (items) => items.item == item_id
      );

      console.log(item_exist);
      if (item_exist != -1) {
        db.get()
          .collection(collections.USER_CART_COLLECTION)
          .updateOne(
            {user_id: object_id(decoded_token.id), "cart_items.item": object_id(item_id) },
            { $inc: { "cart_items.$.quantity": 1 } }
          )
          .then((res) => {
            resolve();
          });
      }else{
         db.get()
           .collection(collections.USER_CART_COLLECTION)
           .updateOne(
             {
               user_id: object_id(decoded_token.id),
             },
             {
               $push: { cart_items: product_object },
             }
           ).then(res=>{
resolve();
           })
      }

     
    } else {
      console.log("user cart is not exist");

      const cart_object = {
        user_name: decoded_token.name,
        user_id: object_id(decoded_token.id),
        cart_items: [product_object],
      };
      // console.log(cart_object);
      db.get()
        .collection(collections.USER_CART_COLLECTION)
        .insertOne(cart_object)
        .then((res) => {
          resolve();
        });
    }
  });
};
