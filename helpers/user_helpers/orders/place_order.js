const collections = require("../../../config/collections");
const db = require("../../../config/connection");
const jwt_based = require("../../globel/jwt_token_decodeder");
const object_id = require("mongodb").ObjectID;

module.exports = place_order = (order,product,total,un_decoded_token)=>{

return new Promise(async(resolve,reject)=>{
       let decoded_token = await jwt_based.token_decoder(un_decoded_token);
       if(!product){
           resolve({status:false})
       }
    let status = order.payment === 'cod'?'placed':'pending';
    let orderObject = {
        deliveryDetails:order,
        totalAmount:total,
        user:object_id(decoded_token.id),
        date: new Date() ,
        paymentMethod:order.payment,
        products:product,
        status:status
    }
     db.get().collection(collections.ORDER_COLLECTION).insertOne(orderObject).then(response=>{

       resolve({
         status: status,
         order_id: response.ops[0]._id,
         total: response.ops[0].totalAmount.total,
       });
     })
    db.get()
      .collection(collections.USER_CART_COLLECTION)
      .removeOne({ user_id: object_id(decoded_token.id) })
      .then((response) => {
        resolve({status:status});
      });
})
}