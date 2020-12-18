require('dotenv');
var jwt = require('jsonwebtoken');
var collection = require('../../config/collections');
var bcrypt = require('bcrypt');
var db =  require('../../config/connection');
var jwt = require('jsonwebtoken')

module.exports ={
     vendor_login:(vender)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(vender);
                         let vendor_already = await   db.get().collection(collection.VENDOR_COLLECTION).findOne({
                                $and:[{email:vender.email},
                                      {status:"active"}]
                            })
                            // console.log(vendor_already);

                            if(vendor_already){
                                //  bcrypt
                                //    .compare(
                                //      vender.password,
                                //      vendor_already.password
                                //    )
                                //    .then((response) => {
                                //      console.log(response);
                                //    });
                             bcrypt.compare(
                               vender.password,
                               vendor_already.password
                             )
                                   .then((status) => {
                                     console.log(status);
                                     if (status) {
                                       console.log("vendor login success");
                                       let vendor_token_data = {
                                         name: vendor_already.name,
                                         id: vendor_already._id,
                                       };
                                       let vendor_token = jwt.sign(
                                         vendor_token_data,
                                         process.env.JWT_SECRET,
                                         { expiresIn: 86400 }
                                       );

                                       resolve({
                                         vendor_token: vendor_token,
                                         login: true,
                                         success_msg:"welcome to home chef vendor ",
                                         err_msg:undefined
                                       });
                                     } else {
                                       resolve({
                                         vendor_token: undefined,
                                         login: false,
                                         err_msg:"incorrect password !!"
                                       });
                                      
                                     }
                                   });
                            }else{
                                 resolve({vendor_token:undefined,login:false,err_msg:"incorrect email !!"})
                                 console.log('vendor login failed');

                            }
        })
    }
}