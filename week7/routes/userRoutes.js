const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
router.post('/', userController.createUser);

// Route to get all users
router.get('/', userController.getAllUsers);

module.exports = router;
