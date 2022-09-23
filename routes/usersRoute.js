const express = require('express');
const { authorize } = require('../controllers/authController');
const router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/name', authorize, usersController.displayName);


module.exports = router;