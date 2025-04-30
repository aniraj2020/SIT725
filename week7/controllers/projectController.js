const projectService = require('../services/projectServices');

const getProjects = async (req, res) => {
  try {
    const projects = await projectService.fetchProjects();
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

module.exports = { getProjects };
