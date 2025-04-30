const mongoose = require("mongoose");
const Project = require("./models/Project");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myprojectDB");

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");

  //clearing existing data to prevent duplicates
  await Project.deleteMany({});

  //SIT725 card
  const projectCard = new Project({
    title: "SIT725 Repository",
    image: "images/project-1.png",
    link: "https://github.com/aniraj2020/SIT725",
    description: "This repo showcases my skills in HTML, CSS, JavaScript and Express. Weekly hands-on work will be committed to this repo and pushed regularly."
  });

  await projectCard.save();
  console.log("Project card inserted successfully!");

  mongoose.connection.close();
});
