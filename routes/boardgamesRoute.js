const express = require('express');
const { authorize } = require('../controllers/authController');
const router = express.Router();

const boardgamesController = require('../controllers/boardgamesController')

router.get('/', boardgamesController.helloWorld);

router.post('/', authorize, boardgamesController.listGame);


module.exports = router;