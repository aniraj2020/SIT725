const express = require("express");
const mongoose = require("mongoose");
const Project = require("./models/Project");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// GET all project cards
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Failed to fetch projects" });
  }
});

// POST form submission (first name, last name, email)
app.post("/api/submit", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email });
    await newUser.save();
    res.status(200).json({ message: "Submission saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving submission" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
