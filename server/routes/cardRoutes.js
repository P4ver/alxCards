const express = require('express');
const {getCards, addCards} = require('../controller/cardController');
const router = express.Router();

router.get('/cards', getCards)
router.post('/cards', addCards)

module.exports = router