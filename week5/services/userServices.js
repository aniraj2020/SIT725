const User = require('../models/User');

const addUser = async (firstName, lastName, email) => {
  const newUser = new User({ firstName, lastName, email });
  return await newUser.save();
};

module.exports = { addUser };
