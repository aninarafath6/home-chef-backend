const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;

module.exports= change_quantity =(data)=>{
return new Promise((resolve,reject)=>{

   if(data.status){
       db.get()
         .collection(collections.USER_CART_COLLECTION)
         .updateOne(
           {
             _id: object_id(data.cart_id),
             "cart_items.item": object_id(data.item_id),
           },
           {
            $push:{"cart_items.item":"data.quantity"}
           },
         )
         .then((response) => {
           resolve({ removeItem: false });
           console.log("changed");
         });
       
   }else{
        if(data.quantity === 0 && data.value === -1){
        db.get()
          .collection(collections.USER_CART_COLLECTION)
          .updateOne(
            { _id: object_id(data.cart_id) },
            {
              $pull: { cart_items :{item:object_id(data.item_id)}},
            }
          ).then(response=>{
              resolve({removeItem:true});
          })

    }else{
        db.get()
        .collection(collections.USER_CART_COLLECTION)
        .updateOne(
          { _id: object_id(data.cart_id), "cart_items.item": object_id(data.item_id) },
          {
            $inc: { "cart_items.$.quantity": data.value },
          }
        )
        .then((response) => {
          resolve({removeItem:false});
        });
    }

   }

})
}