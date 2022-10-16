const express = require('express');
const router = express.Router();

const { authorize } = require('../controllers/authController');
const usersController = require('../controllers/usersController');


router.get('/', authorize, usersController.userDetails);

router.get('/name', authorize, usersController.displayName);


module.exports = router;