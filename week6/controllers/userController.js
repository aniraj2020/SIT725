const userService = require('../services/userServices');

// POST /api/users → Create new user
const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Debug log - check received form data
  console.log("Received form data:", { firstName, lastName, email });

  // Validate input
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "Invalid input: all fields are required." });
  }

  try {
    const newUser = await userService.addUser(firstName, lastName, email);
    res.status(201).json({ message: "Submission saved!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving submission" });
  }
};

// GET /api/users → Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { createUser, getAllUsers };
