import User from "../entity/user";

var sha256 = require("js-sha256").sha256;

module.exports = {
  authentication: function(token) {
    return new Promise((resolve, reject) => {
      console.log("token", token);
      User.findOne({ token: token }, function(err, response) {
        if (err) {
          reject(err);
        }
        console.log("response", response);
        if (response) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }
};
