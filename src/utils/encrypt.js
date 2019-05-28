var sha256 = require("js-sha256").sha256;

module.exports = {
  encrypt: function(email, password) {
    let passwordEncrypt = sha256(email + password);
    return passwordEncrypt;
  },
  generateToken: function(email, password) {
    var timestamp = Number(new Date());
    let token = sha256(email + password + timestamp);
    return token;
  }
};
