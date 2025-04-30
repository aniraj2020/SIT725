const Project = require('../models/Project');

const fetchProjects = async () => {
  return await Project.find({});
};

module.exports = { fetchProjects };
