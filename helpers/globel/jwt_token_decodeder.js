var jwt = require('jsonwebtoken')

module.exports = {
  token_decoder: (authHedder) => {
    return new Promise((resolve, reject) => {
      if (authHedder == undefined) {
        console.log("token is undefined");
        reject({ err: "token undefined" });
      } else {
          let token = authHedder.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            reject({ err: err });
          } else {
            resolve(decode);

            resolve({ decoded: decode });
          }
        });
      }
    });
  },
};