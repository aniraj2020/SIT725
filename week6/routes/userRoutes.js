const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the POST route for form submission
router.post('/', userController.createUser);

module.exports = router;
