const User = require("../../models/user").model;
const encrypt = require("../../lib/encrypt");

const getById = async (id) => {
  return await User.findById(id).exec();
};
const getByEmail = async (email) => {
  const find = await User.findOne({ email }).exec();
  return find;
};
const authenticate = async (user, password) => {
  const hash = user.password;
  return await encrypt.verifyPassword(password, hash);
};
const create = async (firstName, lastName, email, password) => {
  const hash = await encrypt.hashpassword(password);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hash,
  });
  return await newUser.save();
};

const patch = async (id, postData) => {
  return await User.findByIdAndUpdate(id, { ...postData })
    .exec()
    .catch((error) => console.log(error));
};

module.exports = {
  getById,
  getByEmail,
  authenticate,
  create,
  patch,
};
