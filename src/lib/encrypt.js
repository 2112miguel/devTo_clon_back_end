const bcrypt = require("bcrypt");

const hashpassword = async (pswd) => {
  return await bcrypt.hash(pswd, 10);
};

const verifyPassword = async (pswd, hash) => {
  return await bcrypt.compare(pswd, hash);
};

module.exports = {
  hashpassword,
  verifyPassword,
};
