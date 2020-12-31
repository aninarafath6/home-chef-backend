const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = order_management =() =>{
    return new Promise((resolve,reject)=>{
        db
            .get()
            .collection(collections.ORDER_COLLECTION)
            .aggregate([
             
              {
                $unwind: "$products",
              },
              {
                $project: {
                  deliveryDetails: "$deliveryDetails",
                  item: "$products.item",
                  quantity: "$products.quantity",
                  user: "$user",
                  date: "$date",
                  paymentMethod: "$paymentMethod",
                  status: "$status",
                },
              },
              {
                $lookup: {
                  from: collections.ITEM_COLLECTION,
                  localField: "item",
                  foreignField: "_id",
                  as: "items",
                },
              },
              {
                $project: {
                  deliveryDetails: 1,
                  paymentMethod: 1,
                  status: 1,
                  date: 1,
                  user: 1,
                  item: 1,
                  totalAmount:1,
                  quantity: 1,
                  order: { $arrayElemAt: ["$items", 0] },
                },
              },
            ])
            .toArray().then(response=>resolve({data:response}))
    })
}