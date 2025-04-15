const userService = require('../services/userServices');

const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const newUser = await userService.addUser(firstName, lastName, email);
    res.status(200).json({ message: "Submission saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving submission" });
  }
};

module.exports = { createUser };
