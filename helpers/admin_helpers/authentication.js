var db = require("../../config/connection");
var collection = require("../../config/collections");
var bcrypt = require("bcrypt");
var mongo = require("mongodb");
const { ADMIN_COLLECTION } = require("../../config/collections");
var objectId = require("mongodb").ObjectID;

module.exports = {
  //login

  isLogin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let admin = await db
        .get()
        .collection(collection.ADMIN_COLLECTION)
        .findOne({ email: adminData.email });
      if (admin) {
        bcrypt.compare(adminData.password, admin.password).then((status) => {
          if (status) {
            console.log("login success");
            response.admin = admin;
            response.login = true;
            response.status = true;
            resolve(response);
          } else {
            console.log("login failed");
            response.admin = null;
            response.login = false;
            response.status = false;
            resolve(response);
          }
        });
      } else {
        console.log("login failed");
        response.admin = null;
        response.login = false;
        response.status = false;
        resolve(response);
      }
    });
  },

  //end login
};
