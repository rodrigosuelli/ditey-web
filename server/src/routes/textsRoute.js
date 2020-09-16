const express = require('express');
const textsController = require('../controllers/textsController');

const { verifyAccessToken } = require('../middleware/authorizeToken');

const router = express.Router();

router.get('/', verifyAccessToken, textsController.index);

router.post('/', verifyAccessToken, textsController.create);

router.put('/:id', verifyAccessToken, textsController.update);

router.delete('/:id', verifyAccessToken, textsController.delete);

module.exports = router;
