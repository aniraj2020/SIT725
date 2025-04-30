const User = require('../models/User');

// Add a new user
const addUser = async (firstName, lastName, email) => {
  const newUser = new User({ firstName, lastName, email });
  return await newUser.save();
};

// Fetch all users
const fetchAllUsers = async () => {
  return await User.find({});
};

// Export both functions
module.exports = { addUser, fetchAllUsers };
