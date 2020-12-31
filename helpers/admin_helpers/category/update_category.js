const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;


module.exports = update_category  =(newCategory)=>{
    return new Promise((resolve,reject)=>{
        console.log('hi')
        db.get()
          .collection(collections.CATEGORY_COLLECTION)
          .updateOne(
            {
              _id:object_id(newCategory._id)
            },
            {
              $set: {
                category: newCategory.category,
                commission:newCategory.commission
              },
            }
          ).then(response=>{
              resolve({status:true,alertMSG:'Successfully Edited'})
              console.log({update_category:'successfully updated '+newCategory.category});
            }).catch(err=>{
                
                console.log({update_category:'failed updated '+newCategory.category,err:err});
                reject({status:true,alertMSG:'Failed Edited'})
          })
    })
}