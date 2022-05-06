const jwt = require("jsonwebtoken");
const config = require("./config");

const sign = async (payload) => {
  return await jwt.sign(payload, config.app.jwt, { expiresIn: "1h" });
};

const verify = async (token) => {
  return await jwt.verify(token, config.app.jwt);
};

module.exports = { verify, sign };
