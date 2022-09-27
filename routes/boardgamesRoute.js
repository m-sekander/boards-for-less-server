const express = require('express');
const { authorize } = require('../controllers/authController');
const router = express.Router();

const boardgamesController = require('../controllers/boardgamesController')

router.post('/', authorize, boardgamesController.listGame);

router.get('/', authorize, boardgamesController.retrieveListings);

router.get('/:boardgameName', authorize, boardgamesController.retrieveNamedListings);


module.exports = router;