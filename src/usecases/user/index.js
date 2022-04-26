const User = require("../../models/user").model;

const getById = async (id) => {
  return await User.findById(id).exec();
};

const create = async (firstName, lastName, email, password) => {
  const user = new User({ firstName, lastName, email, password });

  return await user.save();
};

module.exports = {
  getById,
  create,
};
