const express = require('express');
const {getCards, addCards, getCardsById, updateCards} = require('../controller/cardController');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")

router.get('/cards', verifyToken, getCards)
// router.get('/cards', getCards)
router.get('/cards/:id', verifyToken, getCardsById)
router.put('/cards/:id', verifyToken, updateCards)
router.post('/cards', verifyToken, addCards)

module.exports = router