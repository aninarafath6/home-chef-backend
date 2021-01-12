require("dotenv");
var jwt = require("jsonwebtoken");
var collection = require("../../config/collections");
var bcrypt = require("bcrypt");
var db = require("../../config/connection");
var jwt = require("jsonwebtoken");

const client = require('twilio')(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN)


module.exports = {
  user_signup: (user_data) => {
    return new Promise(async (resolve, reject) => {
      let is_user_already_exist = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          $or: [{ email: user_data.email }, { phone: user_data.phone }],
        });

      if (is_user_already_exist) {
        resolve({ user_already: true, user_signup: false });
      } else {
        let bcrypted_password = await bcrypt.hash(
          toString(user_data.passWord),
          10
        );
        let new_user = {
          name: user_data.name,
          email: user_data.email,
          password: bcrypted_password,
          phone: `${user_data.phone}`,
          auth: "password",
          status: "active",
        };

        db.get()
          .collection(collection.USER_COLLECTION)
          .insertOne(new_user)
          .then((response) => {
            //    console.log(response.ops[0]);
            let user_token_data = {
              id: response.ops[0]._id,
              name: response.ops[0].name,
            };
            // console.log(user_token_data);
            let token = jwt.sign(user_token_data, process.env.JWT_SECRET, {
              expiresIn: 86400,
            });
            // console.log(token);
            resolve({ token: token, user_already: false, user_signup: true });
          });
      }
    });
  },
  isLogged: (req) => {
    return new Promise((resolve, reject) => {
      let authHedder = req.headers.authorazation;
      if (authHedder == undefined) {
        console.log("token is undefined");
        resolve({ loggin: false });
      } else {
        let token = authHedder.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
          if (err) {
            resolve({ loggin: false });
          } else {
            resolve({ loggin: true });
          }
        });
      }
    });
  },
  sms_login: (input) => {
    return new Promise(async (resolve, reject) => {
      var format = /[0-9]\w+/g;
      if (format.test(input)) {
        // this input is phone
        
        let already_mobile_exist = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({
            $and: [
              { phone: input },
              { auth: "password" },
              { status: "active" },
            ],
          });
        //    console.log(already_mobile_exist);
        if (already_mobile_exist) {
          console.log(input);
          client.verify
            .services(process.env.SERVICE_SID)
            .verifications.create({
              to: input,
              channel: "sms",
            })
            .then((response) => {
              // console.log(response);
              resolve({ type: "otp", otp_sended: true });
            
            }).catch((err)=>{
              console.log(err);
            })
        } else {
          resolve({ type: undefined, otp_sended: false, user: false });
        }
      } else {
        let already_mobile_exist = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({
            $and: [
              { email: input },
              { auth: "password" },
              { status: "active" },
            ],
          });
        if (already_mobile_exist) {
          resolve({ user: true });
        } else {
          resolve({ user: false });
        }
      }
    });
  },
  verify_otp: (data) => {
    return new Promise((resolve, reject) => {
      client.verify
        .services(process.env.SERVICE_SID)
        .verificationChecks.create({
          to: data.phone,
          code: data.otp,
        })
        .then(async (response) => {
          if (response.valid) {
            let user = await db
              .get()
              .collection(collection.USER_COLLECTION)
              .findOne({
                $and: [
                  { phone: data.phone },
                  { auth: "password" },
                  { status: "active" },
                ],
              });
            let token_user_data = {
              name: user.name,
              id: user._id,
            };
            //    console.log(token_user_data);
            let token = jwt.sign(token_user_data, process.env.JWT_SECRET, {
              expiresIn: 86400,
            });
            //   console.log(token);
            resolve({ token: token, login: true });
          } else {
            resolve({ token: undefined, login: false });
          }
          // console.log(response);
        });
    });
  },

  email_verify: (data) => {
    return new Promise(async (resolve, reject) => {
      console.log(data);
      let user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          $and: [
            { email: data.email },
            { auth: "password" },
            { status: "active" },
          ],
        });
      bcrypt.compare(toString(data.password), user.password).then((status) => {
        if (status) {
          console.log("login is success");
          let user_token_data = {
            name: user.name,
            id: user._id,
          };
          let user_token = jwt.sign(user_token_data, process.env.JWT_SECRET, {
            expiresIn: 86400,
          });
          resolve({ token: user_token, login: true });
        } else {
          resolve({ token: undefined, login: false });
        }
      });
    });
  },
};
