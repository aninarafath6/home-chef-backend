var db = require('../config/connection')
var collection = require('../config/collections')
var bcrypt = require('bcrypt')
var mongo = require('mongodb')
const { ADMIN_COLLECTION } = require('../config/collections')
module.exports = {
    isLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {

         let response = {};
          let admin =await  db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email});
          if(admin){
              bcrypt.compare(adminData.password,admin.password).then((status)=>{
                if(status){
                    console.log("login success");
                    response.admin = admin;
                    response.login = true;
                    response.status = true;
                    resolve(response)
                }else{
                    console.log("login failed");
                    response.admin = null;
                    response.login = false;
                    response.status = false;
                    resolve( response);
                }
              })
          }else{
              console.log("login failed");
              response.admin = null;
              response.login = false;
              response.status = false;
              resolve( response );
          }


        })
    },
    add_vendor:(vendor_data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.VENDOR_COLLECTION).insertOne(vendor_data).then((res)=>{
                resolve(res.ops[0]._id);
            })
        })
    },
    get_all_vendors:()=>{
      return new Promise(async(resolve,reject)=>{
           let vendors = await db.get().collection(collection.VENDOR_COLLECTION).find({}).toArray();

           resolve(vendors)
           console.log(vendors);
      })
    }
}