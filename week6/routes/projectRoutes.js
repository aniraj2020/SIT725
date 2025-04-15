const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Define the route and pass to controller
router.get('/', projectController.getProjects);

module.exports = router;
