const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = total =(un_decoded_token)=>{
    return new Promise(async(resolve,reject)=>{
          let decoded_token = await jwt_based.token_decoder(un_decoded_token);
       let cart_items = await db
         .get()
         .collection(collections.USER_CART_COLLECTION)
         .aggregate([
           {
             $match: {
               user_id: object_id(decoded_token.id),
             },
           },
           {
             $unwind: "$cart_items",
           },
           {
             $project: {
               item: "$cart_items.item",
               quantity: "$cart_items.quantity",
             },
           },
           {
             $lookup: {
               from: collections.ITEM_COLLECTION,
               localField: "item",
               foreignField: "_id",
               as: "cart_items",
             },
           },
           {
             $project: {
               item: 1,
               quantity: 1,
               food_item: { $arrayElemAt: ["$cart_items", 0] },
             },
           },
           {
             $group: {
               _id: null,
               total: {
                 $sum: {
                   $multiply: ["$quantity", "$food_item.itemPrice"],
                 },
               },
               discount: {
                 $sum: {
                   $subtract: [1,1],
                 },
               },
             },
           },
         ])
         .toArray();
         console.log(cart_items[0]);
         resolve(cart_items[0])
    })
}