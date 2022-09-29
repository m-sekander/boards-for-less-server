const express = require('express');
const router = express.Router();

const { authorize } = require('../controllers/authController');
const boardgamesController = require('../controllers/boardgamesController')


router.post('/', authorize, boardgamesController.listGame);

router.get('/', authorize, boardgamesController.retrieveListings);

router.get('/user', authorize, boardgamesController.retrieveUserListings);
router.get('/all', boardgamesController.getAll);

router.get('/:boardgameName', authorize, boardgamesController.retrieveNamedListings);

router.get('/details/:boardgameId', authorize, boardgamesController.retrieveSpecificListing);

router.delete('/:boardgameId', authorize, boardgamesController.deleteSpecificListing);


module.exports = router;